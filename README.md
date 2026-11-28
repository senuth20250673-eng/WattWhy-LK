# WattWhy LK — Smart Home Energy Landing Page

A responsive landing page for **WattWhy LK**, a smart home energy startup built for Sri Lankan households.

## Project structure

```
wattwhy/
├── index.html
├── css/styles.css
├── js/app.js
├── assets/            (logo-mark, logo-full-dark, logo-full-light, favicon, apple-touch-icon)
└── README.md
```

`index.html` loads `css/styles.css` and `js/app.js`, so keep this folder layout.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

Tailwind CSS is loaded from its CDN, so an internet connection is needed on first load.

## Page rhythm

Dark metallic sections alternate with calm white ones.

| # | Section | Theme |
|---|---------|-------|
| 1 | Hero + phone mockup (EN / සිංහල / தமிழ்) | Dark |
| 2 | The Problem (paper bill vs WattWhy) | White |
| 3 | Core Features (4 cards) | Dark |
| 4 | What-If Rupee Calculator | White |
| 5 | The WattWhy Advantage | Dark |
| 6 | Safety First | White |
| 7 | Meet the Team | Dark |
| 8 | Pilot sign-up form | White |
| 9 | FAQ + footer | Light / Dark |

Key terms use the purple-blue gradient classes (`.gradient-purple-blue` on white, `.gradient-purple-blue-light` on dark).

## Effects

Scroll reveal with staggering, cursor spotlight on cards, scroll progress bar, sticky header, back-to-top button. Reduced-motion preferences are respected.

## Tariff engine

`calculateBill()` in `js/app.js` drives the calculator. Rates live in the `TARIFF` object at the top of that section, so updating them is a one-place change. The numbers shown in the hero mockup, the paper-bill comparison and the feature cards are consistent with these rates. Update them together if the rates change.

| Units / month | Energy rates (Rs./unit) | Fixed charge |
|---|---|---|
| 0–30 | 12 | 180 |
| 31–60 | 20 (above 30) | 360 |
| 61–90 | 30 (first 60), 37 | 650 |
| 91–120 | 42 | 1,000 |
| 121–180 | 50 | 1,500 |
| 181+ | 65 | 2,000 |

## Pilot form

The form validates in the browser and shows a success message, but it does **not** send data anywhere yet. Connect it to a backend or form service in `initPilotForm()` in `js/app.js`.

## Logo

The original yellow/black logo was recoloured to the page palette (blue → indigo → purple gradient mark, light text on dark). Use `logo-full-dark.png` on dark backgrounds and `logo-full-light.png` on white ones.
