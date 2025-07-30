document.addEventListener('DOMContentLoaded', () => {
    // Navbar fade functionality
    const navbar = document.querySelector('.navbar');
    let fadeTimeout;
    let cooldownTimeout;
    let inactivityTimeout;
    let isInCooldown = false;
    let isInactive = false;
    let lastActivity = Date.now();

    function startFadeTimer() {
        clearTimeout(fadeTimeout);
        const fadeDelay = isInactive ? 3000 : 1000;
        fadeTimeout = setTimeout(() => {
            if (!isInCooldown && !isAtTop()) {
                navbar.classList.add('fade-out');
            }
        }, fadeDelay);
    }

    function showNavbar() {
        navbar.classList.remove('fade-out');
        clearTimeout(fadeTimeout);
        clearTimeout(cooldownTimeout);
        isInCooldown = false;
    }

    function startCooldown() {
        isInCooldown = true;
        clearTimeout(cooldownTimeout);
        cooldownTimeout = setTimeout(() => {
            isInCooldown = false;
            startFadeTimer();
        }, 2000);
    }

    function isAtTop() {
        return window.scrollY <= 100;
    }

    function handleActivity() {
        lastActivity = Date.now();
        if (isInactive) {
            isInactive = false;
            showNavbar();
            startFadeTimer();
        }
        startInactivityTimer();
    }

    function startInactivityTimer() {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            isInactive = true;
            showNavbar();
        }, 10000);
    }

    // Check scroll position
    function handleScroll() {
        handleActivity();
        if (isAtTop()) {
            showNavbar();
            clearTimeout(fadeTimeout);
        } else if (!isInCooldown && !navbar.matches(':hover')) {
            startFadeTimer();
        }
    }

    // Start initial timers
    startFadeTimer();
    startInactivityTimer();

    // Add event listeners
    navbar.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        showNavbar();
    });

    navbar.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        if (!isAtTop()) {
            startCooldown();
        }
    });

    // Activity detection
    ['mousemove', 'keydown', 'click', 'touchstart'].forEach(event => {
        document.addEventListener(event, handleActivity);
    });

    window.addEventListener('scroll', handleScroll);
});
