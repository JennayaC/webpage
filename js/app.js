document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initActiveNav();
    initGlitchEffect();
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
