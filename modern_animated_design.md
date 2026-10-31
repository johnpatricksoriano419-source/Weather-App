---
name: modern-animated-design
description: Build or restyle a website with a modern animated look that blends Minimalism, Neoclassicism, and Glassmorphism using pure HTML, CSS, and Vanilla JavaScript. Use when asked to make a website look modern, elegant, animated, premium, glassy, classical, or minimal. Implements classical serif typography, symmetric layouts, a marble-and-gold palette, frosted glass surfaces, and smooth compositor-only animations without frameworks.
---

# Modern Animated Design

A design system that mixes three styles on purpose: **Minimalism** gives the structure, **Neoclassicism** gives the character, and **Glassmorphism** gives the depth. Built with plain HTML5, native CSS, and Vanilla JavaScript.

## Style Roles

1. **Minimalism = structure.** Generous whitespace, one idea per section, very few elements on screen.
2. **Neoclassicism = character.** Symmetry, centered compositions, serif headings, thin rules, columns and arches as motifs, balanced proportions.
3. **Glassmorphism = depth.** Frosted translucent surfaces for cards, nav, and modals, layered over a soft background.
4. **One accent.** Use exactly one accent color (default: muted gold `#B08D57`), never more.
5. **Restraint.** If an element does not serve one of the three roles, remove it.

---

## Color System (CSS Custom Properties)

- Background light: ivory `#F7F4EE`. Background dark: deep charcoal `#121212`.
- Text primary: `#1C1B19` light, `#F2EEE6` dark.
- Text secondary: primary at 70% opacity. Tertiary: 45% opacity.
- Marble surface: `#EDE9E0` light, `#1C1C1C` dark.
- Accent: muted gold `#B08D57`, used at full, 60%, and 20% opacity only.
- MUST define all colors as variables on `:root` and redefine them under `@media (prefers-color-scheme: dark)`.
- MUST declare `color-scheme: light dark` on the root element.
- NEVER use loud gradients. A single soft, low-contrast radial glow behind glass is allowed.

---

## Typography

- Headings: a classical serif (Cormorant Garamond, Playfair Display, or `Georgia, serif` fallback), light or regular weight, never bold.
- Body: a clean sans-serif (Inter, DM Sans, or `system-ui` fallback), regular weight.
- Small labels: uppercase, wide letter spacing (`0.12em`), small size.
- Headings use slightly negative letter spacing, line height 1.1 to 1.3, and `text-wrap: balance`.
- Body uses line height 1.6, `text-wrap: pretty`, and `max-width: 60ch`.
- Numbers, prices, and counters use `font-variant-numeric: tabular-nums`.
- Use curly quotes, single ellipsis characters, and non-breaking spaces between values and units.

---

## Neoclassical Layout

- MUST favor symmetry: centered hero, centered section titles, balanced two- or three-column grids.
- MUST use CSS Grid with an 8px spacing unit. All spacing is a multiple of 8px.
- Section padding: minimum 80px, standard 120px.
- Use thin 1px gold or low-opacity rules as dividers, with a small centered ornament (a diamond or line) between sections.
- SHOULD use column, arch, or frieze motifs via CSS shapes or inline SVG, kept subtle.
- Max content width: `72rem`, centered.

---

## Glassmorphism

- Glass surface recipe: translucent background (`rgba` at 8% to 16%), `backdrop-filter: blur(16px) saturate(140%)`, 1px border at 20% light, soft shadow.
- MUST include `-webkit-backdrop-filter` and a solid fallback inside `@supports not (backdrop-filter: blur(1px))`.
- MUST place glass over a visible background (soft glow, image, or marble texture) or the effect disappears.
- MUST keep text contrast at least 4.5:1 on glass. Raise the surface opacity if needed.
- Limit glass to nav, cards, and modals. NEVER make every element glass.
- Glass cards may use a modest `border-radius` (12px to 20px). Marble and structural sections stay rectilinear.

---

## Animation & Motion

Animation is requested for this system, so it is allowed, with strict limits.

- MUST animate only `transform` and `opacity`. NEVER animate `width`, `height`, `margin`, or `padding`.
- Entrance reveals: fade up (`translateY(24px)` to `0`), 600ms to 800ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover and press feedback: 150ms to 200ms maximum, `ease-out`.
- Stagger grouped items by 80ms to 120ms.
- Use `IntersectionObserver` to reveal sections once as they enter the viewport, then unobserve.
- Allowed extras: slow floating background glow, subtle parallax on the hero, hover lift on glass cards (`translateY(-4px)`).
- Add `will-change` only on elements that are actively animating.
- MUST wrap all motion in `@media (prefers-reduced-motion: no-preference)` or disable it under `reduce`.
- NEVER loop attention-grabbing animations. Ambient loops must be slow (15s or longer) and subtle.

---

## Components

- Nav: sticky glass bar with a centered serif logo and minimal links.
- Hero: one centered serif headline, one sentence, one call-to-action button.
- Cards: glass surface, generous padding, one icon or number, one short text.
- Buttons: outlined gold or solid gold, uppercase small label, clear `:focus-visible` ring.
- Footer: centered, symmetric, thin top rule, low-opacity text.

---

## Responsive & Accessibility

- Design mobile-first, one column, then expand with `@media (min-width: ...)`.
- Interactive targets are at least 44x44px.
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and `<button>` for actions.
- Add `aria-label` to icon-only buttons.
- Use `100dvh`, never `100vh`.
- Wide tables and code scroll inside an `overflow-x: auto` container.
- Every animated page MUST still be fully readable and usable with animation turned off.
