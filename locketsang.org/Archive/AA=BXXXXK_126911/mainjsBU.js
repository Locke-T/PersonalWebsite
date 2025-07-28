document.addEventListener('DOMContentLoaded', () => {
    // Existing experience card code
    const experienceCards = document.querySelectorAll('.experience-card');
    const experienceContainers = document.querySelectorAll('.experience-container');
    
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
    
    // Existing experience cards code
    experienceCards.forEach((card, index) => {
        const container = experienceContainers[index];
        
        if (card && container) {
            let hasAnimated = false;

            // Function to check if card container is 50% visible
            function isCardVisible() {
                const rect = container.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                // Calculate how much of the container is visible
                const visibleTop = Math.max(rect.top, 0);
                const visibleBottom = Math.min(rect.bottom, windowHeight);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const containerHeight = rect.height;
                
                // Check if at least 50% is visible
                return (visibleHeight / containerHeight) >= 0.5;
            }

            // Scroll event listener
            function handleScroll() {
                if (isCardVisible() && !hasAnimated) {
                    card.classList.add('animate-flip');
                    hasAnimated = true;
                    
                    // Handle animation end events
                    card.addEventListener('animationend', (event) => {
                        if (event.animationName === 'experienceFlipCard') {
                            card.classList.add('flipped');
                            card.style.animation = 'none';
                            setTimeout(() => {
                                card.classList.add('enabled');
                            }, 250);
                        }
                    });
                }
            }

            // Add scroll event listener with throttling for better performance
            let ticking = false;
            function throttledScroll() {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            window.addEventListener('scroll', throttledScroll);
            
            // Check initial state
            handleScroll();
        }
    });
});
