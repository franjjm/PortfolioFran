# Portfolio — Francisco Juarez

Portfolio personal (bilingüe ES/EN) de José Francisco Juarez · Analista Informático.

Sitio estático: HTML + Tailwind (CDN) + React/Babel cargados desde CDN. No requiere build.

## Estructura
- `index.html` — punto de entrada (lo sirve Vercel / GitHub Pages automáticamente)
- `src/` — componentes JSX y contenido (`i18n.js`)
- `assets/` — imágenes y CVs

## Deploy

### Vercel
1. Importá el repo en vercel.com → **New Project**.
2. Framework Preset: **Other**. Build command: vacío. Output dir: `./`.
3. Deploy.

### GitHub Pages
1. Repo → **Settings → Pages**.
2. Source: **Deploy from a branch** → `main` / `/root`.
3. Guardá; el sitio queda en `https://<usuario>.github.io/PortfolioFran/`.
