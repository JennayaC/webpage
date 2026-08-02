document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initActiveNav();
    initGlitchEffect();
    initBootSequence();
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
 * Typewriter boot sequence animation on page load.
 */
function initBootSequence() {
    const container = document.getElementById('boot-sequence');
    if (!container) return;

    const lines = [
        '> INITIALIZING SYSTEM...',
        '> LOADING PROFILE: JENNAYA_HORNE',
        '> UNIT ONLINE. READY.'
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
        if (lineIndex >= lines.length) return;

        const line = lines[lineIndex];

        if (charIndex === 0) {
            const p = document.createElement('p');
            p.id = `boot-line-${lineIndex}`;
            container.appendChild(p);
        }

        const currentP = document.getElementById(`boot-line-${lineIndex}`);
        currentP.textContent = line.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex < line.length) {
            setTimeout(typeLine, 40);
        } else {
            charIndex = 0;
            lineIndex++;
            setTimeout(typeLine, 300);
        }
    }

    typeLine();
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
