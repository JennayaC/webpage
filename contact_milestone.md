# Contact Page Milestone Plan

## Goal
Build a fully functional contact page where visitors can submit their name, email, and a message — and you actually receive those messages at **jennayajch@gmail.com**.

---

## Current State
- `contact.html` already has the form skeleton (name, email, message fields + a submit button).
- ✅ Form inputs have `name` attributes and `method="POST"`.
- ✅ Form is connected to Formspree and receiving real submissions.
- ✅ Client-side validation is in place — invalid fields show pink error messages.
- ✅ Submission state handling is complete (Step 4).

---

## Milestone Steps

### ✅ Step 1 — Fix the HTML Form Structure
**File:** `contact.html`

- [x] Add `name="name"` to the name `<input>`
- [x] Add `name="email"` to the email `<input>`
- [x] Add `name="message"` to the `<textarea>`
- [x] Add `method="POST"` to the `<form>` tag

---

### ✅ Step 2 — Connect a Form Submission Service (Formspree)
**File:** `contact.html`

- [x] Created a free account at https://formspree.io using jennayajch@gmail.com
- [x] Created a new form and copied the endpoint URL
- [x] Set the form's `action` attribute to `https://formspree.io/f/xwvddgyr`
- [x] Verified a real test submission arrived at jennayajch@gmail.com ✉️

---

### ✅ Step 3 — Add Client-Side Validation
**File:** `js/app.js`

- [x] Intercept the form `submit` event with JavaScript
- [x] Check that the name field is not blank
- [x] Check that the email field matches a valid email format
- [x] Check that the message field is not blank
- [x] Show a pink inline error message below invalid fields using `--neon-pink`
- [x] Clear the error automatically when the user starts re-typing

---

### ✅ Step 4 — Handle Submission States (Loading & Success/Error Feedback)
**Files:** `js/app.js`, `contact.html`

- [x] On submit, disable the button and change its text to `TRANSMITTING...` to prevent double-sends
- [x] After a successful response: hide the form and show a green confirmation message (`// TRANSMISSION RECEIVED`)
- [x] After an error response: show a pink error message and re-enable the button so they can retry
- [x] Used `fetch()` to send data without redirecting to Formspree

> **Tip:** These states use existing CSS variables (`--neon-green` for success, `--neon-pink` for error) so no new styles needed.

---

### ✅ Step 5 — Polish & Accessibility
**Files:** `contact.html`, `css/`

- [x] Move the inline `<style>` block from `contact.html` into a dedicated `css/contact.css` file and link it
- [x] Add a fallback line below `SECURE_UPLINK` showing jennayajch@gmail.com as a direct contact option
- [x] Ensure the form is keyboard-navigable (logical tab order, visible focus styles)
- [x] Test on a narrow/mobile screen width to confirm the form doesn't overflow — added `@media (max-width: 600px)` rules to `main.css`

---

## Verification Checklist

- [x] Submitting a real test message through the live site arrives at jennayajch@gmail.com
- [x] Submitting with empty fields shows a pink error message
- [x] The success state (`// TRANSMISSION RECEIVED`) appears after a real submission without a page redirect
- [x] The page looks correct on both desktop and mobile screen sizes
