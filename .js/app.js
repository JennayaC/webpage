/* =========================================================
   THEME MANAGER — Jennaya Horne Portfolio
   Manages: localStorage persistence, data-theme switching,
   theme selector UI, keyboard navigation, ARIA state.
   ========================================================= */

const THEMES = ['retro-gaming', 'playful-modern', 'warm-bauhaus'];
const DEFAULT_THEME = 'retro-gaming';
const STORAGE_KEY = 'jh-portfolio-theme';

/**
 * Reads stored theme from localStorage, validates it, and applies it.
 * Falls back to DEFAULT_THEME if the stored value is missing or invalid.
 */
function initTheme() {
    let stored;
    try {
        stored = localStorage.getItem(STORAGE_KEY);
    } catch (_) {
        stored = null;
    }
    const theme = THEMES.includes(stored) ? stored : DEFAULT_THEME;
    applyTheme(theme, false);
}

/**
 * Applies a theme by setting data-theme on <html> and saving to localStorage.
 * @param {string} theme - The theme identifier.
 * @param {boolean} save - Whether to persist the choice.
 */
function applyTheme(theme, save = true) {
    if (!THEMES.includes(theme)) theme = DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (_) { /* storage unavailable */ }
    }
    syncSelectorUI(theme);
    updateLogoText(theme);
}

/**
 * Updates the logo text to match the active theme's personality.
 * @param {string} theme
 */
function updateLogoText(theme) {
    const logo = document.getElementById('site-logo');
    if (!logo) return;
    const logos = {
        'retro-gaming':   'JH//SYSTEM_V1.0',
        'playful-modern': 'jh',
        'warm-bauhaus':   'jh'
    };
    logo.textContent = logos[theme] || logos['retro-gaming'];
}

/**
 * Updates the theme selector dropdown to reflect the currently active theme.
 * @param {string} activeTheme
 */
function syncSelectorUI(activeTheme) {
    document.querySelectorAll('.theme-option').forEach(opt => {
        const isActive = opt.dataset.themeOption === activeTheme;
        opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
}

/**
 * Initialises the theme selector button and dropdown.
 * Handles: click open/close, item selection, keyboard navigation, outside-click dismiss.
 */
function initThemeSelector() {
    const btn = document.getElementById('theme-btn');
    const dropdown = document.getElementById('theme-dropdown');
    if (!btn || !dropdown) return;

    const options = Array.from(dropdown.querySelectorAll('.theme-option'));

    /* ── Open / close ───── */
    function openDropdown() {
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // Focus first selected or first option
        const active = options.find(o => o.getAttribute('aria-selected') === 'true') || options[0];
        active && active.focus();
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    /* ── Option selection ── */
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            applyTheme(opt.dataset.themeOption);
            closeDropdown();
            btn.focus();
        });

        opt.addEventListener('keydown', (e) => {
            const idx = options.indexOf(opt);
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                applyTheme(opt.dataset.themeOption);
                closeDropdown();
                btn.focus();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                options[(idx + 1) % options.length].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                options[(idx - 1 + options.length) % options.length].focus();
            } else if (e.key === 'Escape' || e.key === 'Tab') {
                closeDropdown();
                btn.focus();
            }
        });
    });

    btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDropdown();
        } else if (e.key === 'Escape') {
            closeDropdown();
        }
    });

    /* ── Outside click / focus-out ── */
    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('open')) {
            closeDropdown();
            btn.focus();
        }
    });
}

/* =========================================================
   ORIGINAL APP FUNCTIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeSelector();
    initClock();
    initActiveNav();
    initGlitchEffect();
    initStatusBar();
    initWalker();
});

/**
 * Updates the digital system clock in the navigation bar.
 */
function initClock() {
    const clockElement = document.getElementById('system-clock');
    if (!clockElement) return;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/**
 * Highlights the navigation link corresponding to the current page.
 * Uses CSS variables so it inherits active theme colours.
 */
function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.style.color = 'var(--nav-active-color)';
            link.style.borderBottom = '2px solid var(--nav-active-color)';
        }
    });
}

/**
 * Enhances the glitch effect on headers by resetting animation on mouseover.
 */
function initGlitchEffect() {
    const glitches = document.querySelectorAll('.glitch');

    glitches.forEach(el => {
        el.addEventListener('mouseover', () => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    });
}

/**
 * Typewriter animation for the status bar items, runs on page load.
 */
function initStatusBar() {
    const stats = [
        { id: 'stat-1', text: '[STATUS: SEEKING_OPPORTUNITIES]' },
        { id: 'stat-2', text: '[FOCUS: SOFTWARE_ENGINEERING]' }
    ];

    let statIndex = 0;
    let charIndex = 0;

    function typeStat() {
        if (statIndex >= stats.length) return;

        const { id, text } = stats[statIndex];
        const el = document.getElementById(id);
        if (!el) return;

        el.textContent = text.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex < text.length) {
            setTimeout(typeStat, 40);
        } else {
            charIndex = 0;
            statIndex++;
            setTimeout(typeStat, 250);
        }
    }

    typeStat();
}

/**
 * ASCII drone floating around the hero section using sine wave motion.
 */
function initWalker() {
    const walker = document.getElementById('ascii-walker');
    if (!walker) return;

    walker.textContent = '  .-"-.\n / o o \\\n |  ---  |\n \\_____/\n   | |  ';

    const hero = document.querySelector('.hero');
    if (!hero) return;

    function animate(timestamp) {
        const heroRect = hero.getBoundingClientRect();
        const walkerRect = walker.getBoundingClientRect();

        const maxX = heroRect.width - walkerRect.width - 10;
        const maxY = heroRect.height - walkerRect.height - 10;

        const t = timestamp * 0.0003;

        // Different frequencies create a wandering Lissajous-style path
        const x = ((Math.sin(t * 1.0) + 1) / 2) * maxX;
        const y = ((Math.sin(t * 0.7 + 1) + 1) / 2) * maxY;

        walker.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/**
 * Contact form validation
 */
const form = document.querySelector("form");

if (form) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    // Checks for invalid contact info and stops it from submitting.
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, "Please enter your name");
            valid = false;
        }
        if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
            showError(emailInput, "Please enter a valid email");
            valid = false;
        }
        if (messageInput.value.trim() === '') {
            showError(messageInput, "Please enter a message");
            valid = false;
        }
        if (!valid) return; // Stops information from sending if it is invalid.

        const button = form.querySelector("button");
        button.disabled = true;
        button.textContent = "TRANSMITTING...";

        // Sends the data without redirecting the user to Formspree host
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        })
            .then(function (response) {
                if (response.ok) {
                    form.style.display = "none";
                    document.getElementById("success-msg").style.display = "block";
                } else {
                    button.disabled = false;
                    button.textContent = "TRANSMIT_DATA";
                    showError(button, "Transmit Failed. Please try again");
                }
            });
    });
}

/**
 * Shows an error message beneath an input if it is invalid.
 */
function showError(input, message) {
    const existing = input.parentElement.querySelector('.error-msg');
    // Removes any existing errors from input
    if (existing) existing.remove();

    // Creates and styles the error message
    const error = document.createElement('p');
    error.className = 'error-msg';
    error.textContent = message;
    error.style.color = 'var(--accent-secondary)';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '0.4rem';
    error.style.fontFamily = 'var(--font-mono)';

    // Clears out error message when user retypes content
    input.addEventListener('input', () => error.remove(), { once: true });
    input.parentElement.appendChild(error);
    input.style.borderColor = 'var(--accent-secondary)';
}
