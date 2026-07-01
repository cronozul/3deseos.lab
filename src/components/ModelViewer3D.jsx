import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ModelViewer3D
 * Wrapper de React para el web component <model-viewer> de Google.
 *
 * Props:
 *   src      — URL del archivo .glb (puede ser absoluta o relativa a /public)
 *   alt      — texto alternativo del modelo
 *   poster   — imagen de loading (opcional; usa la foto del producto si se pasa)
 *
 * Uso en producción:
 *   1. Exporta tu modelo 3D como .glb desde Blender, PrusaSlicer o similar.
 *   2. Colócalo en public/models/<product-id>.glb
 *   3. En i18n.jsx agrega  model3d: '/models/<product-id>.glb'  al producto.
 *
 * NOTA: <model-viewer> es un web component y React no puede capturar su evento
 * 'load' via prop onLoad (React usa delegación sintética que no funciona con
 * custom elements). Se usa useRef + addEventListener para detectar carga real.
 *
 * PATCH: algunos GLB exportados tienen dracoExt.attributes vacío — el mapeo
 * que le dice al DRACOLoader qué atributo Draco corresponde a POSITION. Sin
 * ese mapeo, model-viewer no encuentra la geometría y WebGL falla con
 * "Framebuffer is incomplete: Attachment has zero size". Se parchea en runtime
 * antes de pasar la URL a model-viewer.
 */

/**
 * Parchea GLBs con dracoExt.attributes vacío: agrega POSITION:0 al mapeo.
 * Devuelve un Blob URL con el JSON chunk corregido (el Draco binary no cambia).
 */
async function patchGlbDracoAttrs(src) {
  try {
    const resp = await fetch(src);
    if (!resp.ok) return src;
    const ab = await resp.arrayBuffer();
    const buf = new Uint8Array(ab);
    const dv = new DataView(ab);

    // Buscar el chunk JSON (type = 0x4E4F534A)
    let jsonStart = -1, jsonChunkLen = 0;
    let offset = 12;
    while (offset < buf.length) {
      const cLen  = dv.getUint32(offset, true);
      const cType = dv.getUint32(offset + 4, true);
      if (cType === 0x4E4F534A) { jsonStart = offset + 8; jsonChunkLen = cLen; break; }
      offset += 8 + cLen;
    }
    if (jsonStart === -1) return src;

    const jsonText = new TextDecoder().decode(buf.slice(jsonStart, jsonStart + jsonChunkLen)).replace(/\0+$/, '');
    const gltf = JSON.parse(jsonText);

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

    // Reconstruir el chunk JSON con el fix
    const newJson    = new TextEncoder().encode(JSON.stringify(gltf));
    const newPadded  = Math.ceil(newJson.length / 4) * 4;
    const newPad     = new Uint8Array(newPadded - newJson.length).fill(0x20);

    const oldJsonPaddedLen = Math.ceil(jsonChunkLen / 4) * 4;
    const restStart  = jsonStart + oldJsonPaddedLen;
    const rest       = buf.slice(restStart);

    const newTotal = 12 + 8 + newPadded + rest.length;
    const out    = new Uint8Array(newTotal);
    const outDV  = new DataView(out.buffer);
    let p = 0;
    const w32 = (v) => { outDV.setUint32(p, v, true); p += 4; };
    const wb  = (a) => { out.set(a, p); p += a.length; };

    w32(0x46546C67); w32(2); w32(newTotal);      // GLB header
    w32(newPadded); w32(0x4E4F534A); wb(newJson); wb(newPad); // JSON chunk
    wb(rest);                                      // BIN chunk as-is

    return URL.createObjectURL(new Blob([out], { type: 'model/gltf-binary' }));
  } catch (e) {
    console.warn('[ModelViewer3D] GLB patch failed:', e);
    return src;
  }
}

const ModelViewer3D = ({ src, alt, poster }) => {
  const [loaded, setLoaded] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState(null);
  const mvRef = useRef(null);
  const blobRef = useRef(null);

  // Parchea el GLB si es necesario, luego pasa la URL resuelta a model-viewer
  useEffect(() => {
    let revoked = false;
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

  // Escucha el evento 'load' nativo del web component
  useEffect(() => {
    const el = mvRef.current;
    if (!el) return;
    const handleLoad = () => setLoaded(true);
    el.addEventListener('load', handleLoad);
    return () => el.removeEventListener('load', handleLoad);
  }, [resolvedSrc]);

  // Usamos spread para pasar atributos con guiones (ej: auto-rotate)
  // ya que JSX no permite auto-rotate={true} directamente.
  if (!resolvedSrc) return null; // Espera el patch async antes de montar model-viewer

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

      {/* El web component de Google — ref se pasa directo, no en el spread */}
      <model-viewer ref={mvRef} {...mvProps} />

      {/* Hint de interacción — pointer-events-none para no bloquear el viewer */}
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
