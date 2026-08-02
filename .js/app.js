document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initActiveNav();
    initGlitchEffect();
    initStatusBar();
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
 */
function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.style.color = 'var(--neon-pink)';
            link.style.textShadow = 'var(--glow-pink)';
            link.style.borderBottom = '2px solid var(--neon-pink)';
        }
    });
}

/**
 * Enhances the glitch effect on headers by randomly shifting data-text offsets.
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
 * Contact form Validation
 */
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

//Checks for invalid contact info and stops it from submitting.
form.addEventListener("submit", function (e) {

    e.preventDefault();
    let valid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, "Please enter your name");
        valid = false;
    }
    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        showError(emailInput, "Please enter a valid email")
        valid = false;
    }
    if (messageInput.value.trim() === '') {
        showError(messageInput, "Please enter a message")
        valid = false;
    }
    if (!valid) return; //Stops information from sending if it is invalid.

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "TRANSMITTING...";

    //Sends the data without redirecting the user to Formspree Host
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
                showError(button, "Transmit Failed. Please Try again");
            }
        });


});

/**
 * Shows error message to user if input is invalid
 */
function showError(input, message) {
    const existing = input.parentElement.querySelector('.error-msg');
    //Removes any existin errors from input
    if (existing) existing.remove();
    //Creates and styles the error message
    const error = document.createElement('p');
    error.className = 'error-msg';
    error.textContent = message;
    error.style.color = 'var(--neon-pink)';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '0.4rem';
    error.style.fontFamily = 'var(--font-mono)';

    //Clears out error message when user retypes content
    input.addEventListener('input', () => error.remove(), { once: true });
    input.parentElement.appendChild(error);
    input.style.borderColor = 'var(--neon-pink)';

}
