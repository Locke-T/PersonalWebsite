// ============================================
// COVER JAVASCRIPT - Black intro animation
// ============================================

// Cover page animation script
document.addEventListener('DOMContentLoaded', function() {
    const diveButton = document.getElementById('diveBtn');
    const coverLeft = document.getElementById('cover-left');
    const coverRight = document.getElementById('cover-right');
    const centerContent = document.querySelector('.center-content');
    const coverContainer = document.getElementById('cover-container');
    
    // Add click event listener to the dive button
    diveButton.addEventListener('click', function() {
        // Start the split animation
        startSplitAnimation();
    });
    
    function startSplitAnimation() {
        // Fade out the center content first
        centerContent.classList.add('fade-out');
        
        // After a short delay, start the split animation
        setTimeout(() => {
            // Add split classes to both halves
            coverLeft.classList.add('split-left');
            coverRight.classList.add('split-right');
            
            // After animation completes, redirect to main page
            setTimeout(() => {
                window.location.href = '../Main/main.html';
            }, 1500); // Match the CSS transition duration
            
        }, 300); // Small delay to let content fade out
    }
    
    // Optional: Add keyboard support (Enter or Space to activate)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            startSplitAnimation();
        }
    });
    
    // Optional: Add some interactive effects
    diveButton.addEventListener('mouseenter', function() {
        // Add extra glow on hover
        diveButton.style.boxShadow = `
            0 0 40px #ff0080,
            0 0 60px #ff0080,
            0 0 80px #ff0080,
            inset 0 0 40px rgba(255, 0, 128, 0.3)
        `;
    });
    
    diveButton.addEventListener('mouseleave', function() {
        // Reset to normal glow
        diveButton.style.boxShadow = '';
    });
});