# ABOUT_MILESTONE // About Page

## Current State

The about page (`about.html`) is well-developed with solid content:
- `ABOUT_ME` glitch hero header
- **EDUCATION** section — BS in CS from USD, coursework list, capstone summary
- **EXPERIENCE** section — BD capstone role + Hostess/Busser role
- **TECHNICAL_SPECS** section — 4-column skill grid (Languages, Frameworks, Libraries, Areas of Interest)

The content is complete and accurate. The main opportunities here are **visual polish** and **one meaningful missing section**.

---

## Improvement Ideas

### 1. Resume Download Button
**What:** Add a `DOWNLOAD_RESUME` button near the top of the page (e.g., below the `ABOUT_ME` header or in the nav area). Links to a hosted PDF of your resume.

**Why it stands out:** Recruiters landing on the about page immediately want the resume. Making them hunt for it is friction. A single well-placed button removes that friction entirely.

**Files affected:** `about.html`

---

### 2. Skill Bars or Tag Pills for TECHNICAL_SPECS
**What:** Currently, skills are plain bulleted lists. Consider replacing them with either:
  - **Animated progress/confidence bars** (e.g., `Python ████████░░ 80%`)
  - **Tag pill chips** — small monospace badges that look like terminal tokens

**Why it stands out:** The skills section is a grid of plain lists right now. A small visual upgrade here makes the section feel more designed and memorable, without changing any content.

**Files affected:** `about.html`, `css/main.css`

---

### 3. Timeline Layout for EXPERIENCE
**What:** Instead of plain `<div>` blocks, present the experience entries as a vertical timeline — a left-border line with dot markers at each job, and dates on the right.

**Why it stands out:** A timeline is one of the most recognized visual patterns for résumé/portfolio pages. It makes the section scannable at a glance and looks far more designed than stacked paragraphs.

**Files affected:** `about.html`, `css/main.css`

---

### 4. Move All Inline Styles to a Dedicated CSS File
**What:** `about.html` currently has a large number of inline `style=""` attributes on nearly every element. These should be extracted to a new `css/about.css` file, mirroring the refactor already done for `contact.html`.

**Why it stands out:** This is a code quality improvement — it makes the HTML readable and maintainable, and is consistent with the project's evolving CSS structure. No visual change, but important for keeping the codebase clean.

**Files affected:** `about.html`, new `css/about.css`

---

## Checklist

- [ ] Add a `DOWNLOAD_RESUME` button (requires uploading resume PDF first)
- [x] Upgrade TECHNICAL_SPECS to use tag pills or animated skill indicators
- [ ] Redesign EXPERIENCE as a vertical timeline layout
- [x] Extract all inline styles from `about.html` into `css/about.css`
