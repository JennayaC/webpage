# PROJECTS_MILESTONE // Projects Page

## Current State

The projects page (`projects.html`) is the most feature-rich page:
- `PROJECTS` glitch header with `// DEPLOYED SOLUTIONS AND EXPERIMENTS` subtitle
- Collapsible card grid (5 projects)
- Cards expand/collapse with `[+]` / `[-]` toggle
- Each card shows: title, category tag, description, and tech stack in monospace
- Inline CSS block for `.card`, `.card-header`, `.card-body`, `.card-toggle` styles

The page works well and has good interactivity. Improvements here are mostly about **polish** and **expanding what each project entry communicates**.

---

## Improvement Ideas

### 1. GitHub Links on Project Cards
**What:** Add a `[VIEW_REPO]` link on each card that opens the project's GitHub repository in a new tab. If a project isn't on GitHub yet (e.g., the BD capstone), it can be omitted or replaced with `[PRIVATE_REPO]` shown as disabled/greyed out.

**Why it stands out:** Recruiters and hiring managers will want to look at code. A direct link from the card is the natural next step after reading a project description and removes all friction.

**Files affected:** `projects.html`

---

### 2. Status Badge per Project
**What:** Add a small status indicator to each card header, such as:
- `[COMPLETE]` — green
- `[IN_PROGRESS]` — cyan/yellow
- `[ARCHIVED]` — muted grey

Currently, the portfolio website card has `(In Progress)` in the subtitle, but it's inconsistent and hard to spot.

**Why it stands out:** Instantly scannable. Recruiters can see at a glance which projects are finished work vs. ongoing. Fits perfectly with the terminal-log visual language already on the site.

**Files affected:** `projects.html`, `css/main.css` (or move card styles to `css/projects.css`)

---

### 3. Move Inline `<style>` Block to a Dedicated CSS File
**What:** All `.card`, `.card-header`, `.card-body`, etc. styles currently live in a `<style>` tag inside `projects.html`. These should be moved to a new `css/projects.css` file, consistent with the `contact.html` → `css/contact.css` refactor pattern.

**Why it stands out:** Code quality improvement. Makes the HTML file readable and keeps all CSS in one predictable place.

**Files affected:** `projects.html`, new `css/projects.css`

---

### 4. Filter Bar by Technology
**What:** Add a row of filter buttons above the grid (e.g., `ALL`, `PYTHON`, `C++`, `C`, `HTML/CSS/JS`). Clicking a filter shows only cards containing that tech stack tag.

**Why it stands out:** Once you have 5+ projects, filtering makes the page significantly more useful for someone who wants to specifically see, say, your systems-level C/C++ work vs. your ML/Python work. It also adds noticeable interactivity that most basic portfolio sites lack.

**Files affected:** `projects.html`, `js/app.js` (or a new `js/projects.js`)

---

## Checklist

- [ ] Add GitHub repo links to each project card
- [ ] Add status badges (`COMPLETE`, `IN_PROGRESS`, `ARCHIVED`) to card headers
- [ ] Move inline `<style>` block to `css/projects.css`
- [ ] Implement tech-stack filter bar above the project grid
