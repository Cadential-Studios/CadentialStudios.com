# Cadential Studios Website Canvas

## Brand Style

* **Logo:** Minimalist, elegant script + spaced-out all-caps sans-serif
* **Font:** Montserrat (primary; bold, uppercase for headings & nav, regular/light for body)
* **Color Palette:**

  * White (#FFFFFF) or very light gray (#F8F8F8) background
  * Black (#111111) for logo/text
  * Charcoal (#222222/#333333) for body text
  * Soft accent color (optional): Electric blue, gold, or magenta for highlights/CTAs
* **Spacing:** Generous white space throughout
* **Imagery:** Minimal, monochrome or muted-color images, subtle shadows
* **UI:** Rounded corners, thin borders, soft divider lines, smooth fade/slide transitions

---

## Homepage Layout

```
------------------------------------------------------------
| [LOGO: cs script + "CADENTIAL STUDIOS"]                 |
|             Quality from start to finish                 |
------------------------------------------------------------
| [Navigation: Projects | About | Music | Podcast | Contact]|
------------------------------------------------------------

| HERO AREA:                                               |
|  - White/gray background                                 |
|  - Short tagline: "Crafting multimedia experiences."      |
|  - (Optional) Subtle animation: Faint looping video       |
|    or image related to your work                         |
|  - [EXPLORE] button (primary CTA, accent color)          |
------------------------------------------------------------

| FEATURED PROJECTS: Minimal grid layout                   |
|  - Project image/logo tile                               |
|  - Project title (Montserrat, caps, spaced out)          |
|  - 1-line description                                    |
|  - On click: Opens subdomain (e.g., lineage.cadential.com)|
------------------------------------------------------------

| WHAT WE DO: Icon row or cards                            |
|  - Game Development | Music | Animation | AI | Podcasts  |
|  - Simple line icons, accent hover effect                |
------------------------------------------------------------

| NEWSLETTER/SOCIALS:                                      |
|  - Clean subscribe bar                                   |
|  - Minimal, monochrome social icons                      |
------------------------------------------------------------

| FOOTER:                                                  |
|  - Centered logo (smaller), quick nav links, motto       |
|  - e.g., © 2025 Cadential Studios | Quality from start   |
|    to finish                                             |
|  - Social icons (small, monochrome)                      |
------------------------------------------------------------
```

---

## Projects Page

* Gallery grid: Each tile = project logo/image, name, short blurb
* “View Project” button opens dedicated subdomain (clean transition)
* Filterable by type (Game, Music, etc.)
* "Coming Soon" badge for WIP projects

---

## About Page

* Studio origin story: 2-3 short, punchy paragraphs
* Team avatars/names, minimal bios
* Motto accent: "Every detail matters—quality from start to finish."

---

## Contact Page

* Minimal form: Name, email, message
* "Let’s collaborate. Quality from start to finish."

---

## Subdomain Project Sites (e.g., lineage.cadential.com)

* Consistent minimalist style (Montserrat, white/gray, logo in corner)
* Project logo and tagline up top
* About, Media, Devlogs/Updates, Play/Listen, Contact sections
* “Back to Cadential Studios” link or logo

---

## Special Features

* Light/Dark mode toggle (top right, very minimal icon)
* Smooth page transitions, fade/slide animations
* Subtle hover effects (underline, slight text color shift)
* Fully mobile responsive
* Accessibility: high contrast, keyboard nav, alt text
* SVG animated logo on load (script initials draw in, fade to static)
* Glassmorphism effect on project cards (blurred background, frosted glass look)
* Scroll-in animations for sections (fade and translate)
* Sticky navigation with fade-in background on scroll
* Custom slim, rounded scrollbar for minimalist polish
* AI-powered FAQ or chatbot widget (optional, bottom right corner)
* 404 page: minimalist, clever message, “Back to Home” button
* Podcast player: embedded, styled to match theme
* Minimal, animated loading indicator (CS initials or dot loader)

---

## Example Typography/CSS

```css
body {
  font-family: 'Montserrat', Arial, sans-serif;
  background: #fff;
  color: #222;
}
h1, h2, h3, .logo-text {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
}
.nav-link, .footer-link {
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.button {
  font-weight: 600;
  border-radius: 24px;
  padding: 12px 28px;
  border: 1px solid #111;
  background: transparent;
  transition: background 0.2s, color 0.2s;
}
.button:hover {
  background: #111;
  color: #fff;
}
/* Glassmorphism card */
.glass-card {
  background: rgba(255,255,255,0.6);
  box-shadow: 0 4px 32px rgba(0,0,0,0.03);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  border: 1px solid rgba(200,200,200,0.3);
}
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  background: #f8f8f8;
}
::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 4px;
}
/* Focus styles for accessibility */
:focus {
  outline: 2px solid #111;
  outline-offset: 2px;
}
```

---

## HTML/Design Details

* Animate logo SVG on first page load using CSS/JS.
* Use `<main id="main-content">` for accessibility/skip-link support.
* Embed podcast player in podcast section or project subpages.
* Use `<picture>` with WebP fallbacks for images.
* Lazy-load images/videos for speed.
* Use `<audio>` for music previews, styled with custom CSS.
* Each project card: `<a href="https://[project].cadential.com" class="glass-card">…</a>`
* Custom 404.html with brand voice.

---

## Inspirations

* Supergiant Games, Vercel, Monstercat, Panic
* Midjourney minimal web, Figma for microinteractions

---

## Notes

* Keep copy concise, let visuals lead.
* Use whitespace to create focus and elegance.
* Consistent brand voice: confident, creative, intentional.
* Show off “Quality from start to finish” visually and in microcopy (footer, tooltips, badges, loading screens, etc).
* Compress assets for speed (WebP, SVG, minified CSS/JS).
* Use only 1–2 accent colors to maintain minimalist feel.
* Consider subtle page transition effects for extra polish.
