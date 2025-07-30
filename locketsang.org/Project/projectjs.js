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
    
    // Mobile touch hover for project cards
    function initMobileProjectHover() {
        if (window.innerWidth <= 768) {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                // Add touch event listeners
                card.addEventListener('touchstart', function(e) {
                    // Remove mobile-hover from all other cards
                    projectCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('mobile-hover');
                        }
                    });
                    
                    // Toggle mobile-hover on current card
                    card.classList.toggle('mobile-hover');
                });
            });
            
            // Remove hover when touching outside project cards
            document.addEventListener('touchstart', function(e) {
                if (!e.target.closest('.project-card')) {
                    projectCards.forEach(card => {
                        card.classList.remove('mobile-hover');
                    });
                }
            });
        }
    }
    
    // Initialize mobile project hover
    initMobileProjectHover();
    
    // Re-initialize on window resize
    window.addEventListener('resize', () => {
        // Remove all mobile-hover classes when switching between mobile/desktop
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.remove('mobile-hover');
        });
        
        // Re-initialize if on mobile
        initMobileProjectHover();
    });
});
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


