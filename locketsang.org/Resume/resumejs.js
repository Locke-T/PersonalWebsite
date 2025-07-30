document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    function isAtTop() {
        return window.scrollY <= 100;
    }
    
    function handleScroll() {
        if (isAtTop()) {
            navbar.classList.remove('fade-out');
        } else {
            navbar.classList.add('fade-out');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
});


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


