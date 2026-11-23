# Viry & Ángel · Invitación digital

Invitación web para la boda de Viry & Ángel (23 de enero de 2027). Estética oscura con la paleta
de la planner (carbón, borgoña, olivo y beige), tipografía Pinyon Script (títulos), Gilda Display (frases y subtítulos) y DM Sans (cuerpo), y
una línea del tiempo interactiva de sus más de 16 años juntos.

Todo el contenido vive en `src/data/invitation.ts`. Los pendientes de los novios están listados
al inicio de ese archivo y se muestran como "por confirmar" o se ocultan hasta tenerlos.

## Invitaciones personalizadas

Agrega a la URL el nombre y los lugares reservados:

```text
https://<dominio>/?n=Familia+López&p=4
```

`n` aparece en la portada y en la bienvenida, y prellena el formulario; `p` limita cuántas personas
pueden confirmar.

## Activar pendientes

- **Horarios:** `time` en cada venue y `invitation.time` (cambia el calendario de "todo el día" a
  evento con hora).
- **Itinerario:** llenar `schedule`; la sección aparece sola.
- **Confirmación:** `rsvp.phone` habilita el botón de WhatsApp.
- **Música:** importar el audio en `src/assets/audio/` y asignarlo a `music`.
- **Historia:** reemplazar `photo` y textos de cada capítulo en `story.chapters`; `years` controla
  el contador.

## Technology

- React + TypeScript + Vite.
- React Router.
- Framer Motion with reduced-motion support.
- Sass split into global tokens, base rules, shared components, and page-local partials.
- Lucide icons.
- Express production server and Railway configuration.
- Optional future SQLite persistence documented separately.

## Commands

```bash
npm install
npm run dev
npm run format:check
npm run lint
npm run build
npm start
```

`npm start` expects an existing `dist/`, so run `npm run build` first locally.

## Architecture

```text
src/
  assets/
    fonts/
    images/
  components/          Shared reusable UI
  data/                Replaceable invitation data
  hooks/               Cross-page hooks
  pages/
    home-page/
      sections/        Home-only components
      styles/          Home-only Sass
      home-page.tsx
      index.ts
    not-found-page/
  styles/
    abstracts/         Sass tokens and mixins
    base/              Reset, typography, accessibility
    components/        Shared component styles
    main.scss          Sass entry point
  types/               Shared TypeScript models
server/                Production server and future API
docs/                  Architectural extension guides
```

Every React-related filename uses kebab-case. Page folders export their public component through
`index.ts`. Page-only components, hooks, utilities, and styles stay under that page. Only reusable
code belongs in global folders.

## Starting a real invitation

1. Duplicate this repository and rename the package.
2. Replace `src/data/invitation.ts` with the event data.
3. Add or remove sections under `src/pages/home-page/sections/`.
4. Customize the palette tokens in `src/styles/abstracts/_variables.scss`.
5. Add licensed fonts and images under `src/assets/`.
6. Replace title, description, Open Graph data, canonical URL, and favicon in `index.html`.
7. Keep `noindex, nofollow` for private invitations; intentionally remove it only when indexing is
   desired.

## Adding a page

Create a kebab-case folder under `src/pages/`, add its `index.ts`, sections, hooks, utilities, and
styles, then add matching aliases to both `tsconfig.app.json` and `vite.config.ts`.

## Sass organization

Global design decisions belong in `src/styles/abstracts/_variables.scss`. Shared component styles
belong in `src/styles/components/`. Styles used only by one route belong under that page's `styles/`
folder. Register every partial once in `src/styles/main.scss`; Vite recompiles Sass automatically
during development.

## Optional database

The draft does not install or initialize a database. See
[`docs/optional-persistence.md`](docs/optional-persistence.md) for the exact extension path using the
same Express, SQLite, authentication, upload, and Railway volume approach as `maloba.mx`.

## Railway

Connect the invitation's own GitHub repository to a separate Railway project. `railway.json`
defines the build, start command, and `/api/health` healthcheck. Static invitations need no volume
or environment variables. Add the invitation's explicit subdomain as a custom domain and copy the
CNAME and TXT records Railway provides into GoDaddy.

## Design customization

Edit `src/data/invitation.ts` for headings, honorees, date, UTC offset, dress code, schedule, images,
venue, and WhatsApp number (international digits). RSVP runs in preview mode without a phone;
it does not send or store data. The venue link is displayed only when `mapUrl` is configured.
The generic, AI-generated photograph in `public/celebration-neutral.png` is used for the cover and footer.
Replace it or configure separate images for each new event. Typography uses Google Fonts with local serif/sans fallbacks.
