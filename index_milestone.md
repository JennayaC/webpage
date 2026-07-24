# INDEX_MILESTONE // Home Page

## Current State

The home page (`index.html`) has a strong visual foundation:
- `JENNAYA HORNE` glitch hero header with subtitle and location line
- Live system clock in the nav bar
- Brief intro paragraph
- Single `ACCESS_BIO` CTA button linking to `about.html`

The page is clean but minimal — it's essentially just a hero section with one button. There's a lot of room to give it more energy and personality without cluttering it.

---

## Improvement Ideas

### 1. Animated Terminal "Boot Sequence"
**What:** On page load, display a short typewriter-style "boot log" above or below the hero text — lines like:
```
> INITIALIZING SYSTEM...
> LOADING PROFILE: JENNAYA_HORNE
> UNIT ONLINE. READY.
```
**Why it stands out:** Reinforces the hacker/terminal aesthetic the site already has. Feels alive and immersive on first visit.

**Files affected:** `index.html`, `js/app.js`

---

### 2. Quick-Stats / Status Bar Section
**What:** Add a row of "system status" stats below the intro paragraph. For example:
```
[ STATUS: SEEKING_OPPORTUNITIES ] [ BASED: TACOMA_WA ] [ FOCUS: SOFTWARE_ENGINEERING ]
```
Styled like terminal readouts with blinking cursor icons.

**Why it stands out:** Gives recruiters fast, scannable info without reading a full bio. Fits perfectly with the existing monospace terminal theme.

**Files affected:** `index.html`, `css/main.css` (or a new `css/index.css`)

---

### 3. Secondary CTA Buttons (Projects + Resume)
**What:** The current page has only one CTA: `ACCESS_BIO`. Add two more alongside it:
- `VIEW_PROJECTS` → links to `projects.html`
- `DOWNLOAD_RESUME` → links to a hosted PDF of your resume

**Why it stands out:** Recruiters visiting the home page want a fast path to your work and resume. Three terminal-styled buttons in a row looks much more polished than one lone button.

**Files affected:** `index.html`

---

### 4. Background Particle / Grid Animation
**What:** Add a subtle animated grid or floating particle effect to the hero background using pure CSS or a tiny JS snippet.

**Why it stands out:** Every other page is mostly text on a dark background. The home page hero is the one place where a background visual effect would be appropriate and impactful — it won't distract, but it elevates the first impression significantly.

**Files affected:** `index.html`, `css/main.css`

---

## Checklist

- [ ] Implement typewriter boot sequence on page load
- [ ] Add quick-stats / status bar section
- [ ] Add secondary CTA buttons (`VIEW_PROJECTS`, `DOWNLOAD_RESUME`)
- [ ] Add hero background grid/particle animation
- [ ] Move any inline styles added above to `css/main.css` or a dedicated `css/index.css`
