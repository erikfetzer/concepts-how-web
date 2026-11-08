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
| The universe | `universe.html` | Powers-of-ten zoom, cosmic calendar, black-hole size calculator, expanding-space demo, bestiary of weird objects, big open questions |
| Game theory | `gametheory.html` | Play the prisoner’s dilemma, Axelrod tournament with evolution, Nowak–May spatial game, Nash equilibrium explorer, guess ⅔ of the average |
| Logic | `logic.html` | Operators with Venn diagrams, truth table builder, argument validity checker, five proofs with a picture proof, full-adder logic gates, knights and knaves, 28 fallacies with a quiz |
| Probability | `probability.html` | Monty Hall with N doors and 1,000-game simulation, birthday paradox curve and random rooms, animated Galton board, coin-flip law of large numbers, Bayes medical-test grid |
| Codes & encryption | `codes.html` | Caesar wheel, frequency-analysis cracker, Vigenère with flattened frequencies, SHA-256 avalanche, Diffie–Hellman paint mixing and numbers, toy RSA |
| Infinity | `infinity.html` | Hilbert’s hotel animation, Cantor zigzag through the fractions, interactive diagonal argument, convergent and divergent series, Mandelbrot zoom, “which infinity is bigger” quiz |
| Language | `language.html` | Indo-European cognate explorer, Zipf’s law on any text, name in Greek/Cyrillic/Braille/Morse/NATO/binary with Morse audio, English–Spanish false friends quiz |
| Maps & projections | `maps.html` | Nine projections with Tissot circles and drag-to-rotate, draggable true-size countries (incl. Africa), great circle vs rhumb line on Mercator and globe. Uses `lib/geo.js` (d3-geo bundle) and `lib/world-110m.js` |
| Money & economics | `money.html` | Compound interest with “start 10 years later” comparison, inflation basket, supply & demand with price controls and events, money-multiplier rounds |
| Light & color | `light.html` | Prism and electromagnetic spectrum, additive vs subtractive mixing, Rayleigh-scattering sky with sun-height slider, cone sensitivity and color-blindness simulation, simultaneous-contrast illusion |
| Algorithms | `algorithms.html` | Five-way sorting race, binary-search number guesser, BFS/DFS/greedy/A* pathfinding on a drawable grid, Big-O growth table, travelling salesperson with nearest neighbour, 2-opt and brute force |
| Biases & the mind | `mind.html` | Adjustable Müller-Lyer/Ebbinghaus/Ponzo illusions, Cognitive Reflection Test, reaction timer, Stroop test, digit span, 22-bias field guide |
| Music & sound | `music.html` | Live synth with oscilloscope, harmonic builder with instrument presets, playable keyboard with interval ratios, beats, Doppler/Mach-cone animation, hearing-range tones and decibel scale |
| Evolution | `evolution.html` | Be-the-bird peppered moth selection, Wright–Fisher genetic drift, Dawkins weasel (cumulative selection vs chance), antibiotic resistance colony, tree of life with divergence dates |

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

## Navigation

Topic links in each page’s header are folded by `theme.js` into a **Topics** button (⋮ on phones) that opens a grid grouped by subject: Maths & logic, Physics & space, People & society, Tech & measurement. To add a page to a group, add its slug to `GROUPS` in `theme.js`. On phones the language and theme switches also move into that menu.

## Disclaimer

`disclaimer.html` (and `es/disclaimer.html`, “Aviso legal”) covers as-is use, no professional advice, demos, limitation of liability, sources, privacy and cookies (with a button that reopens the cookie banner), content and trademarks, translations and changes. Each page’s footer links to it.

## Analytics and cookie consent

Google Tag Manager (`GTM-T9P7XFHH`) and Google Analytics 4 (`G-1EL2GJW0J3`, via gtag.js directly) load on every page. Don’t also add a GA4 tag for the same ID inside GTM, or page views will count twice. A small inline script sets Google Consent Mode v2 to denied for everything before GTM loads. `consent.js` shows an Accept / Decline banner (English or Spanish, from the page language), stores the choice in `localStorage` under `consent`, and sends `gtag('consent','update', …)` plus a `consent_update` dataLayer event. A **Cookies** link in each footer reopens the banner.
