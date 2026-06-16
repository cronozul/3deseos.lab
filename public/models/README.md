# Modelos 3D de productos

Coloca aquí los archivos `.glb` de cada producto.
El nombre del archivo debe coincidir con el ID del producto en `src/i18n.jsx`.

## Convención de nombres

| Producto               | Archivo esperado         |
|------------------------|--------------------------|
| Matera Carita Feliz    | `t-carita.glb`           |
| Matera Amigos          | `t-amigos.glb`           |
| Matera Ballenita       | `t-ballenita.glb`        |
| Florero Prisma         | `t-florero.glb`          |
| Portalápices T-Rex     | `t-trex.glb`             |
| Joyero Sardinas        | `t-sardinas.glb`         |
| Organizador de latas   | `h-latas.glb`            |
| Waffle Bowl            | `h-waffle.glb`           |
| Escultura Ángel        | `h-angel.glb`            |
| Colgador de llaves     | `h-llaves.glb`           |
| Soporte Ovejita Shaun  | `h-ovejita.glb`          |
| Angel Osito            | `h-osito.glb`            |
| Llavero Spiderman      | `g-spiderman.glb`        |
| Llavero Espadas GOW    | `g-gow.glb`              |
| Bomba Jinx             | `g-jinx.glb`             |
| Llavero Hollow Knight  | `g-hollow.glb`           |
| Castillo Torre de Dados| `g-dados.glb`            |

## Cómo obtener el .glb

1. **Desde Blender:** File → Export → glTF 2.0 → selecciona "glTF Binary (.glb)"
2. **Desde OrcaSlicer / PrusaSlicer:** exporta el modelo STL, luego ábrelo en Blender y exporta como .glb
3. **Conversión rápida online:** https://products.aspose.app/3d/conversion/stl-to-glb

## Cómo activar el modelo real en el producto

Una vez que tengas el archivo, edita `src/i18n.jsx` y cambia la línea del producto:

```js
// Antes (placeholder):
model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb"

// Después (tu modelo real):
model3d: "/models/t-florero.glb"
```
