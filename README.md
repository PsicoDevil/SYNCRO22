# SYNCRO22 — Sitio Oficial

Sitio oficial de **SYNCRO22**, banda de Rock / Nu Metal / Metal / Alternative Rock.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

## Estructura

```
app/          # Rutas y layouts
components/   # Componentes UI y de layout
content/      # Datos de la banda (separados de la UI)
lib/          # Utilidades y configuración
public/       # Assets estáticos (logo, fotos, etc.)
```

## Contenido

Los datos de la banda viven en `content/` con tipos en `content/types.ts`.
Cuando se conecte un CMS, solo se reemplaza la capa de datos — la UI no cambia.

## Desarrollo

```bash
npm run dev
```

## Validación

```bash
npm run lint
npm run build
```
