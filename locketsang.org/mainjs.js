document.addEventListener('DOMContentLoaded', () => {
    // Existing experience card code
    const experienceCards = document.querySelectorAll('.experience-card');
    const experienceContainers = document.querySelectorAll('.experience-container');
    
    // Simple navbar fade functionality
    const navbar = document.querySelector('.navbar');
    
    function isAtTop() {
        return window.scrollY <= 100;
    }
    
    function handleNavbarScroll() {
        if (isAtTop()) {
            navbar.classList.remove('fade-out');
        } else {
            navbar.classList.add('fade-out');
        }
    }
    
    // Initial check
    handleNavbarScroll();
    
    // Listen to scroll events for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
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

            // Scroll event listener for cards
            function handleCardScroll() {
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
            function throttledCardScroll() {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleCardScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            window.addEventListener('scroll', throttledCardScroll);
            
            // Check initial state
            handleCardScroll();
        }
    });
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

    // Mobile touch hover for project cards
    function initMobileProjectHover() {
        if (window.innerWidth <= 768) {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                // Add touch event listeners
                card.addEventListener('touchstart', function(e) {
                    e.preventDefault(); // Prevent default touch behavior
                    
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

