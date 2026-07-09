# Contact Page Milestone Plan

## Goal
Build a fully functional contact page where visitors can submit their name, email, and a message — and you actually receive those messages at **jennayajch@gmail.com**.

---

## Current State
- `contact.html` already has the form skeleton (name, email, message fields + a submit button).
- The form has **no `name` attributes** on the inputs, so data can't be sent anywhere yet.
- There is **no submission handler** — clicking "TRANSMIT_DATA" does nothing.
- `js/app.js` handles the nav clock but has no form logic.

---

## Milestone Steps

### Step 1 — Fix the HTML Form Structure
**File:** `contact.html`

The form inputs are missing `name` attributes, which are required for any submission service to read the values.

- [ ] Add `name="name"` to the name `<input>`
- [ ] Add `name="email"` to the email `<input>`
- [ ] Add `name="message"` to the `<textarea>`
- [ ] Add `action` and `method` attributes to `<form>` (filled in Step 2)

> **Note:** Without `name` attributes, form data is invisible to the server — this is the most important fix before anything else.

---

### Step 2 — Connect a Form Submission Service (Formspree)
**File:** `contact.html`

Since this is a static website (no backend server), you need a free third-party service to receive and email you the form submissions. **Formspree** is the simplest option — it's free, requires no backend code, and emails responses directly to jennayajch@gmail.com.

- [ ] Create a free account at https://formspree.io using jennayajch@gmail.com
- [ ] Create a new form and copy the provided endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`)
- [ ] Set the form's `action` attribute to that URL and `method="POST"`

> **Important:** Formspree's free tier allows 50 submissions/month — plenty for a portfolio site.

---

### Step 3 — Add Client-Side Validation
**File:** `js/app.js`

The `required` attribute on the fields provides basic browser validation, but we can add a custom layer for a better user experience.

- [ ] Intercept the form `submit` event with JavaScript
- [ ] Check that the name field is not blank
- [ ] Check that the email field matches a valid email format (simple regex)
- [ ] Check that the message field is not blank
- [ ] If validation fails, highlight the offending field with a red/pink glow (using the existing `--neon-pink` / `--glow-pink` CSS variables) and show an inline error message

---

### Step 4 — Handle Submission States (Loading & Success/Error Feedback)
**Files:** `js/app.js`, `contact.html`

Right now clicking "TRANSMIT_DATA" does nothing visually. We need to communicate what's happening to the user.

- [ ] On submit, disable the button and change its text to `TRANSMITTING...` to prevent double-sends
- [ ] After a successful response: hide the form and show a green confirmation message (e.g. `// TRANSMISSION RECEIVED`)
- [ ] After an error response: show a pink error message and re-enable the button so they can retry

> **Tip:** These states use existing CSS variables (`--neon-green` for success, `--neon-pink` for error) so no new styles needed.

---

### Step 5 — Polish & Accessibility
**File:** `contact.html`, `css/`

Small finishing touches that make the page feel complete and professional.

- [ ] Move the inline `<style>` block from `contact.html` into a dedicated `css/contact.css` file and link it
- [ ] Add a fallback line below `SECURE_UPLINK` showing jennayajch@gmail.com as a direct contact option
- [ ] Ensure the form is keyboard-navigable (logical tab order, visible focus styles)
- [ ] Test on a narrow/mobile screen width to confirm the form doesn't overflow

---

## Verification Checklist

Before marking this milestone done, confirm all of the following:

- [ ] Submitting a real test message through the live site arrives at jennayajch@gmail.com
- [ ] Submitting with empty fields shows an error (not a blank submission)
- [ ] The success state (`// TRANSMISSION RECEIVED`) appears after a real submission
- [ ] The page looks correct on both desktop and mobile screen sizes
