# Catálogo de Música

La interfaz vive en `/musica`. No requiere agregar enlaces al menú principal.

## Canciones y letras

Agregar una entrada en `songs.ts` con un `id` estable y el título confirmado.
Cada canción se define una sola vez; los lanzamientos reutilizan esa entrada.
Si no hay letra, omitir `lyrics`: la interfaz muestra «Letra pendiente de carga».

Cuando haya una letra, completar `sourceTitle`, `sourceDocument`, `sourcePage`
y `blocks`, en orden. Cada bloque tiene `text` y uno de estos tipos:

- `verse`: texto cantado. Usar `\n` para los saltos de línea. Un bloque por estrofa.
- `cue`: indicaciones de estructura como `[Intro]`, `[Estribillo]` o `Solo`.
  Se conservan únicamente en los datos de origen; no se muestran en la página.
- `note`: instrucciones de ensayo. También se conservan únicamente en los datos,
  sin desplegable ni bloque público de anotaciones.

Conservar grafías, acentos, signos y repeticiones de la fuente. Las indicaciones
`BIS` y `x3` se conservan en los datos tal como aparecen, sin expandir versos por
deducción. La vista pública muestra solo bloques `verse` y omite esas marcas
cuando están al final de una línea. Los versos repetidos que ya están escritos,
las estrofas y los saltos de línea se mantienen. La referencia al PDF sigue visible.
Los separadores gráficos `--` y `---` de Amarre se representan como separación
entre estrofas. Las notas entre paréntesis de Espada de Tinta se conservan como
`note`; el `-Fin-` unido al último verso de Caramelo Oscuro se conserva como `cue`.

## Discos y singles

En `releases.ts`, agregar un `Release` con `id`, `slug`, `title`, `type`, `tracks`
y `streamingLinks`. `album` y `ep` aparecen en Discos; `single`, en Singles.
Construir los tracks desde las entradas de `songs`, asignando `trackNumber`
en el orden oficial. La interfaz ordena por ese campo, sin modificar los datos.

`cover`, `releaseDate` (ISO), `year` y `description` son opcionales. Cargarlos solo
cuando estén confirmados; las portadas deben existir dentro de `public`.
Un single usa la misma estructura, normalmente con una sola canción.
Los enlaces de plataformas y de canciones también son opcionales.

Para un single con audio local, completar `audioUrl` en la entrada original de
la canción en `songs.ts`, usando su ruta pública (espacios codificados como `%20`).
Referenciar esa misma canción en el lanzamiento, agregar su `cover` y el `artist`
confirmado. La ficha de un single de una canción muestra el reproductor propio
y obtiene la duración del archivo, sin cargar fechas ni duraciones supuestas.
Si la canción ya tiene ficha en un disco, «Ver letra» abre esa ficha existente;
si no, se muestra su desplegable en el single. La letra no se duplica.

Las canciones sin un lanzamiento asignado se conservan en los datos y no se
muestran en el catálogo. No clasificarlas como singles por descarte.

## Correspondencias con Letras Syncro22.pdf

| Título oficial | Título del PDF | Página |
| --- | --- | --- |
| Corazon Ejecutor | Corazón ejecutor | 4 |
| S/N | S/N (Canción sin nombre) | 5 |
| POSESION | Posesión | 10 |
| Lenguas Largas | Lengua Larga | 7 |
| Espada de Tinta | Espada de tinta | 3 |

El documento también incluye **Abrazo del angel** (página 9). Se mantiene con ese
título en los datos, sin mostrarlo en el catálogo ni atribuirlo a un lanzamiento.
Las nueve canciones del disco tienen letra en el documento. El disco se llama
**9 Peldaños**; Salamanca es el título de su primera canción.

## Estrenos independientes

- **POSESIÓN**: single destacado y exclusivo de la web. Estreno el 24/10/2026
  a las 00:00 de Argentina (`2026-10-24T00:00:00-03:00`). Usa su portada
  `/singles/posesion-cover.png` y el WAV existente `/audio/posesion.wav`, cuyo uso
  fue confirmado. El reproductor actual admite ese formato sin conversión.
  La URL de audio se asigna al track de este single, no al del álbum.
  `audioPreview: true` habilita desde ahora su reproducción completa con
  `npm run dev`, sin mensaje de espera. No requiere cambiar el reloj ni las fechas.
  Esta preescucha solo se aplica en desarrollo (`NODE_ENV=development`);
  `npm run build` y `npm run start` conservan la fecha pública del single.
- **9 Peldaños**: página `/musica/9-peldanos`. La fecha se toma exclusivamente
  de `site.releaseDate`, actualmente `2026-10-31T06:06:06-03:00` (horario unificado
  con el countdown por confirmación de la banda).
  El original está en `private/album/9-peldanos-cover.png`, fuera de `public`.
  La URL `/album/9-peldanos-cover.png` se conserva como endpoint protegido.
- **Nochecita en el Jumeal**: conserva su portada y su MP3 existentes.

`revealAt` indica el embargo completo de un álbum; no cambiarlo por la fecha de
un single. `getVisibleReleases` excluye los álbumes embargados y quita las URLs
de escucha de los singles cuyo estreno no llegó, salvo la preescucha explícita
de desarrollo de POSESIÓN. Las páginas usan `connection()`
para evaluar el reloj del servidor en cada petición, sin congelar el estado en
el build ni enviar la ficha oculta al cliente. No añadir fechas de prueba ni
parámetros que permitan saltar el embargo en producción.

`ReleaseRefresh` vuelve a consultar al servidor al vencer la próxima fecha y al
regresar a una pestaña abierta. El countdown existente se reutiliza únicamente
para el álbum; no controla el single. Los enlaces de letras se calculan solo
entre lanzamientos visibles para evitar apuntar a una ficha todavía oculta.

La portada del álbum se entrega desde un Route Handler de Node solo cuando llega
`site.releaseDate`; antes responde 404 sin bytes de imagen ni caché. `proxy.ts`
bloquea también las solicitudes de `/_next/image` dirigidas a esa portada, incluso
si una variante optimizada ya estaba guardada en caché antes del cambio.
No mover el original de nuevo a `public` ni importarlo como imagen estática: eso
volvería a crear un recurso público ajeno al control de fecha. El archivo privado
se incluye mediante el file tracing del handler para su disponibilidad en el servidor.
No hay enlaces de plataformas confirmados para el álbum; se cargarán en
`streamingLinks` cuando estén disponibles.
