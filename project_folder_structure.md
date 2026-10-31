---
name: project-folder-structure
description: Set up and maintain a clean, scalable folder structure for any project. Use when starting a new project, organizing messy files, splitting a large file into modules, or asking where a file should go. Covers static HTML/CSS/Vanilla JS sites, multi-page sites, small web apps, and general project hygiene with consistent naming rules.
---

# Project Folder Structure

Enforces a predictable, scalable folder structure so any project is easy to read, easy to update, and easy to hand to someone else.

## Core Principles

- MUST organize by purpose: structure, style, behavior, and assets live in separate places.
- MUST keep the root folder clean. Only config files, `README.md`, and the entry point belong there.
- MUST make every file's location guessable from its name and role.
- SHOULD add structure only when it is needed. A 3-file project does not need 12 folders.
- NEVER dump everything into one folder or one giant file.
- NEVER nest folders deeper than 4 levels.

---

## Naming Rules

- MUST use lowercase with hyphens for files and folders: `hero-section.css`, `image-gallery.js`.
- NEVER use spaces, capital letters, or special characters in file names.
- MUST name files by what they are, not by version: `styles.css`, never `styles-final-v2-new.css`.
- MUST name the main page `index.html` so servers and hosts find it automatically.
- SHOULD name images by content: `hero-bg.webp`, `logo-light.svg`.
- SHOULD use plural names for collections (`images/`, `components/`) and singular for single-purpose files.

---

## Structure 1: Simple Static Site (Single Page)

```
project-name/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

- Use when the site is one page with one stylesheet and one script.

---

## Structure 2: Multi-Page Static Site

```
project-name/
├── index.html
├── README.md
├── pages/
│   ├── about.html
│   ├── services.html
│   └── contact.html
├── css/
│   ├── base/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── typography.css
│   ├── layout/
│   │   ├── grid.css
│   │   ├── header.css
│   │   └── footer.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   └── modal.css
│   └── main.css
├── js/
│   ├── main.js
│   ├── components/
│   │   ├── modal.js
│   │   └── nav.js
│   └── utils/
│       └── helpers.js
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

- `variables.css` holds all colors, spacing, and font tokens as CSS custom properties.
- `main.css` only imports the other CSS files, in order: base, layout, components.
- Each JS component handles one feature and is loaded as an ES module.

---

## Structure 3: Small Web App (Vanilla JS)

```
project-name/
├── index.html
├── README.md
├── .gitignore
├── src/
│   ├── css/
│   ├── js/
│   │   ├── main.js
│   │   ├── state.js
│   │   ├── api.js
│   │   ├── components/
│   │   └── utils/
│   └── data/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── docs/
```

- `state.js` owns app data. `api.js` owns all `fetch` calls. Components never fetch directly.
- `data/` holds static JSON files.

---

## Assets

- MUST use WebP or AVIF for photos, SVG for icons and logos, WOFF2 for fonts.
- MUST compress images before adding them to the project.
- SHOULD keep one folder per asset type: `images/`, `icons/`, `fonts/`, `video/`.
- NEVER store unused assets. Delete what no file references.

---

## CSS & JS File Rules

- MUST keep one responsibility per file.
- SHOULD split a file once it passes roughly 300 lines.
- MUST load CSS in `<head>` and JS with `defer` or `type="module"`.
- MUST use relative paths (`./css/styles.css`), never absolute local paths like `C:/Users/...`.
- NEVER leave commented-out code blocks or unused files in the project.

---

## Root Files

- `README.md`: what the project is, how to run it, folder overview.
- `.gitignore`: ignore `node_modules/`, `.DS_Store`, `.env`, and build output.
- `favicon.ico` or `favicon.svg`: in the root or `assets/icons/`.
- NEVER commit secrets, API keys, or `.env` files.

---

## Maintenance

- MUST update `README.md` whenever the structure changes.
- MUST move files instead of copying them, then fix every path that referenced them.
- SHOULD review the structure when a folder has more than 10 loose files.
- SHOULD end any restructure with a list of moved files and updated paths.
