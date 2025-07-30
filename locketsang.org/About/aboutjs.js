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

