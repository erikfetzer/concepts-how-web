# concepts.how

Interactive explainers for big ideas: what each concept is and how it works.

A static site with no build step. Every page is a self-contained HTML file.

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Links to each concept |
| Metric units | `units.html` | 64 metric units by quantity: name origins, history, original and current definitions, imperial equivalents, and a converter |
| Voting methods | `voting.html` | Election simulator, ranked-ballot paradoxes, a guide to 12 counting methods, and a fairness-criteria table |
| Time paradoxes | `time.html` | Twin-paradox spacetime diagram, ladder paradox, reversible arrow-of-time gas, Zeno’s race, grandfather-paradox timeline |
| Blockchain & consensus | `blockchain.html` | Live SHA-256 hash chain with mining, 51% attack odds and simulator, Byzantine generals vote, consensus field guide |
| Quantum mechanics | `quantum.html` | Double-slit experiment, Bloch-sphere qubit with gates, Bell/CHSH test, Grover’s search |
| Dimensions & perception | `dimensions.html` | Rotating tesseract, Flatland slicer, 4D visitor in a sealed room, orbits by dimension, Koch fractal, perception lab |

## Spanish

Every page has a hand-translated Spanish copy in `es/` (served at `/es/...`). The EN/ES link in the nav switches between matching pages, and `hreflang` alternates tell search engines they are translations.

## Brand assets

- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`: the “c.” mark
- `og.png`: 1200×630 link-preview card
- `site.webmanifest`: install metadata (name, colors, icons)

Social tags point at `https://concepts.how/og.png`, so previews work once the domain is live. `vercel.json` turns on clean URLs (`/units`, `/voting`).

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

## Deploy

Works as-is on Vercel, Netlify or GitHub Pages. No framework or build command; the output directory is the repo root.
