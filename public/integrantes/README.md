# /public/integrantes — Retratos oficiales

Fotos de los integrantes que se muestran en la página `/integrantes`.

## Archivos actuales

| Archivo       | Integrante | Dimensiones |
| ------------- | ---------- | ----------- |
| `eligo.png`   | Eligo      | 1042 × 1509 |
| `gianfra.png` | Gianfra    | 1254 × 1254 |

## Convención de nombres

El nombre de archivo debe coincidir con el `id` del integrante definido en
`content/members.ts`, en minúsculas y sin espacios: `<id>.png`.

## Formato recomendado

- **Formato:** PNG o JPG (fotos sin transparencia → preferir JPG).
- **Proporción:** vertical 4:5 o 2:3. El componente muestra el retrato en un
  marco 4:5 con recorte centrado (`object-cover`); la proporción original se
  conserva en el archivo.
- **Tamaño:** mínimo 1200 px en el lado más largo.
- **Peso:** los originales pueden ser pesados (los actuales rondan 2 MB);
  `next/image` genera versiones optimizadas al vuelo, no hace falta
  reconvertir manualmente.

## Cómo agregar un integrante

1. Subir la foto a esta carpeta con el nombre `<id>.png`.
2. Agregar el registro correspondiente en `content/members.ts`
   (`id`, `name` y `photo: "/integrantes/<id>.png"`).
3. Rol y biografía (`role`, `bio`) se completan solo con información
   confirmada por la banda — no se inventa contenido.