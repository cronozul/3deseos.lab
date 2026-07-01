import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ModelViewer3D
 * Wrapper de React para el web component <model-viewer> de Google.
 *
 * Props:
 *   src           — URL del archivo .glb
 *   alt           — texto alternativo
 *   poster        — imagen de loading (opcional)
 *   selectedColor — color activo: 'white'|'black'|'red'|'blue'|'gold'|'gray'|'tornasol'
 *
 * Funcionalidades:
 *   - Patch en runtime de GLBs con dracoExt.attributes vacío (bug de exportador).
 *   - Cambio de color en tiempo real via model-viewer Material API.
 *   - Tornasol: animación cíclica con requestAnimationFrame a través del
 *     degradado firma de 3deseos.lab (morado→azul→cian→verde).
 */

// ── Patch Draco ───────────────────────────────────────────────────────────────
async function patchGlbDracoAttrs(src) {
  try {
    const resp = await fetch(src);
    if (!resp.ok) return src;
    const ab  = await resp.arrayBuffer();
    const buf = new Uint8Array(ab);
    const dv  = new DataView(ab);

    let jsonStart = -1, jsonChunkLen = 0, offset = 12;
    while (offset < buf.length) {
      const cLen  = dv.getUint32(offset, true);
      const cType = dv.getUint32(offset + 4, true);
      if (cType === 0x4E4F534A) { jsonStart = offset + 8; jsonChunkLen = cLen; break; }
      offset += 8 + cLen;
    }
    if (jsonStart === -1) return src;

    const gltf = JSON.parse(new TextDecoder().decode(buf.slice(jsonStart, jsonStart + jsonChunkLen)).replace(/\0+$/, ''));
    let changed = false;
    for (const mesh of gltf.meshes || []) {
      for (const prim of mesh.primitives || []) {
        const dracoExt = prim.extensions?.KHR_draco_mesh_compression;
        if (dracoExt && Object.keys(dracoExt.attributes).length === 0) {
          dracoExt.attributes['POSITION'] = 0;
          changed = true;
        }
      }
    }
    if (!changed) return src;

    const newJson   = new TextEncoder().encode(JSON.stringify(gltf));
    const newPadded = Math.ceil(newJson.length / 4) * 4;
    const newPad    = new Uint8Array(newPadded - newJson.length).fill(0x20);
    const rest      = buf.slice(jsonStart + Math.ceil(jsonChunkLen / 4) * 4);
    const newTotal  = 12 + 8 + newPadded + rest.length;
    const out = new Uint8Array(newTotal);
    const outDV = new DataView(out.buffer);
    let p = 0;
    const w32 = (v) => { outDV.setUint32(p, v, true); p += 4; };
    const wb  = (a) => { out.set(a, p); p += a.length; };
    w32(0x46546C67); w32(2); w32(newTotal);
    w32(newPadded); w32(0x4E4F534A); wb(newJson); wb(newPad);
    wb(rest);
    return URL.createObjectURL(new Blob([out], { type: 'model/gltf-binary' }));
  } catch (e) {
    console.warn('[ModelViewer3D] GLB patch failed:', e);
    return src;
  }
}

// ── Sistema de colores ────────────────────────────────────────────────────────
// base en espacio lineal (sRGB→lineal) para PBR correcto.
// metallic: 0-1  |  roughness: 0-1
const SOLID_COLORS = {
  white: { base: [1.0000, 1.0000, 1.0000, 1], metallic: 0.00, roughness: 0.80 }, // #FFFFFF
  black: { base: [0.0452, 0.0452, 0.0452, 1], metallic: 0.10, roughness: 0.55 }, // #3C3C3C
  red:   { base: [0.4508, 0.0513, 0.0578, 1], metallic: 0.00, roughness: 0.70 }, // #B34044
  blue:  { base: [0.0000, 0.1248, 0.3515, 1], metallic: 0.00, roughness: 0.70 }, // #0063A0
  gold:  { base: [0.6514, 0.2961, 0.0467, 1], metallic: 0.90, roughness: 0.22 }, // #D3943D
  gray:  { base: [0.5647, 0.5972, 0.6308, 1], metallic: 0.65, roughness: 0.30 }, // #C6CBD0 silver
};

// Tornasol: ciclo morado→rojo→azul→verde, referencia matera corazón
// Valores lineales de: #7A2DB5 #C83545 #1459C8 #28A85A
const TORNASOL_KF = [
  [0.1946, 0.0262, 0.4621], // #7A2DB5 morado
  [0.5776, 0.0356, 0.0595], // #C83545 rojo
  [0.0070, 0.0999, 0.5776], // #1459C8 azul
  [0.0212, 0.3916, 0.1022], // #28A85A verde
  [0.1946, 0.0262, 0.4621], // vuelve al morado (cierra el loop)
];
const TORNASOL_PERIOD = 4200; // ms para un ciclo completo

const lerp = (a, b, t) => a + (b - a) * t;
const lerpColor = (c1, c2, t) => c1.map((v, i) => lerp(v, c2[i], t));

function applyMaterialColor(mv, base, metallic, roughness) {
  const model = mv.model;
  if (!model?.materials?.length) return;
  for (const mat of model.materials) {
    const pbr = mat.pbrMetallicRoughness;
    try {
      pbr.setBaseColorFactor(base);
      pbr.setMetallicFactor(metallic);
      pbr.setRoughnessFactor(roughness);
    } catch (_) { /* material sin PBR — ignorar */ }
  }
}

// ── Componente ────────────────────────────────────────────────────────────────
const ModelViewer3D = ({ src, alt, poster, selectedColor = 'white' }) => {
  const [loaded, setLoaded]         = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState(null);
  const mvRef   = useRef(null);
  const blobRef = useRef(null);

  // 1. Patch Draco + resolver src
  useEffect(() => {
    let revoked = false;
    setLoaded(false);
    patchGlbDracoAttrs(src).then((url) => {
      if (revoked) { if (url !== src) URL.revokeObjectURL(url); return; }
      if (url !== src) blobRef.current = url;
      setResolvedSrc(url);
    });
    return () => {
      revoked = true;
      if (blobRef.current) { URL.revokeObjectURL(blobRef.current); blobRef.current = null; }
    };
  }, [src]);

  // 2. Escucha evento 'load' nativo del web component
  useEffect(() => {
    const el = mvRef.current;
    if (!el) return;
    const handleLoad = () => setLoaded(true);
    el.addEventListener('load', handleLoad);
    return () => el.removeEventListener('load', handleLoad);
  }, [resolvedSrc]);

  // 3. Aplicar color al material (o animar tornasol)
  //
  // Usamos `cancelled` local + `frameId` local en lugar de un rafRef compartido.
  // Esto evita la condición de carrera donde el cleanup del efecto anterior
  // borra rafRef.current justo cuando el nuevo efecto ya lo está usando.
  useEffect(() => {
    if (!loaded || !mvRef.current) return;

    let cancelled = false;

    if (selectedColor === 'tornasol') {
      const startTime = performance.now();
      let frameId;

      const tick = (now) => {
        if (cancelled) return;
        const mv = mvRef.current;
        if (!mv) return;
        const t      = ((now - startTime) % TORNASOL_PERIOD) / TORNASOL_PERIOD;
        const scaled = t * (TORNASOL_KF.length - 1);
        const idx    = Math.floor(scaled);
        const frac   = scaled - idx;
        const color  = lerpColor(TORNASOL_KF[idx], TORNASOL_KF[Math.min(idx + 1, TORNASOL_KF.length - 1)], frac);
        applyMaterialColor(mv, [...color, 1.0], 0.95, 0.10);
        frameId = requestAnimationFrame(tick);
      };

      frameId = requestAnimationFrame(tick);
      return () => { cancelled = true; cancelAnimationFrame(frameId); };
    } else {
      const def = SOLID_COLORS[selectedColor] ?? SOLID_COLORS.white;
      applyMaterialColor(mvRef.current, def.base, def.metallic, def.roughness);
      return () => { cancelled = true; };
    }
  }, [loaded, selectedColor]);

  if (!resolvedSrc) return null;

  const mvProps = {
    src: resolvedSrc,
    alt: alt || 'Modelo 3D del producto',
    'camera-controls': '',
    'auto-rotate': '',
    'auto-rotate-delay': '1500',
    'rotation-per-second': '18deg',
    'shadow-intensity': '1.2',
    'shadow-softness': '0.8',
    'environment-image': 'neutral',
    'exposure': '0.9',
    'ar': '',
    'ar-modes': 'webxr scene-viewer quick-look',
    'reveal': 'auto',
    style: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      '--poster-color': 'transparent',
      '--progress-bar-color': '#316DBC',
      '--progress-bar-height': '2px',
    },
    ...(poster ? { poster } : {}),
  };

  return (
    <div className="relative w-full h-full">
      {/* Spinner mientras carga el .glb */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-transparent pointer-events-none"
          >
            <div className="w-10 h-10 rounded-full border-2 border-brand-blue/30 border-t-brand-blue animate-spin mb-3" />
            <span className="text-xs text-white/40 font-jost tracking-widest uppercase">Cargando modelo…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* El web component de Google */}
      <model-viewer ref={mvRef} {...mvProps} />

      {/* Hint de interacción */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 pointer-events-none z-30"
          >
            <svg className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" strokeDasharray="4 2" />
              <path d="M12 12l-2-2m0 4l2-2 2 2m-2-2v3" />
            </svg>
            <span className="text-[11px] text-white/60 whitespace-nowrap font-jost tracking-wide">
              Arrastra para rotar · Pellizca para zoom
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelViewer3D;
