// ─────────────────────────────────────────────────────────────────────
// Paso final del build: convierte los archivos *.b64 de dist/ en el
// binario que representan (p. ej. dist/links/og.jpg.b64 → dist/links/og.jpg).
//
// ¿Por qué existe? El conector de GitHub que usan los agentes de
// desarrollo solo sube archivos de texto. Las imágenes que tienen que
// existir como archivo real (como la vista previa del enlace en WhatsApp)
// se guardan en base64 con la extensión .b64 y este paso las reconstruye.
// Las imágenes que subas normalmente desde GitHub no necesitan nada de esto.
//
// Nunca hace fallar el build: si algo sale mal, solo deja un aviso.
// ─────────────────────────────────────────────────────────────────────
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

async function* buscarB64(dir) {
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) yield* buscarB64(ruta);
    else if (entrada.name.endsWith('.b64')) yield ruta;
  }
}

try {
  let total = 0;
  for await (const ruta of buscarB64(DIST)) {
    const texto = await readFile(ruta, 'utf8');
    const binario = Buffer.from(texto.replace(/\s+/g, ''), 'base64');
    const destino = ruta.slice(0, -'.b64'.length);
    await writeFile(destino, binario);
    await unlink(ruta);
    total += 1;
    console.log(`[decodificar-binarios] ${destino.slice(DIST.length)} (${binario.length} bytes)`);
  }
  console.log(`[decodificar-binarios] Listo: ${total} archivo(s).`);
} catch (error) {
  console.warn(`[decodificar-binarios] Aviso: no se pudo completar (${error.message}). El build sigue.`);
}
