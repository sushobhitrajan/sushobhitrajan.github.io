// Main JavaScript file for personal website
// Navigation and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Highlight active navigation link based on current page
    setActiveNavLink();
    
    // Add smooth scrolling for anchor links
    initSmoothScroll();
    
    // Handle profile image fallback
    handleProfileImageFallback();
    
    console.log('Website loaded successfully!');
});

/**
 * Sets the active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Handle profile image fallback - hide image if it fails to load
 */
function handleProfileImageFallback() {
    const profileImages = document.querySelectorAll('.profile-image img');
    profileImages.forEach(img => {
        // Hide image if it fails to load
        img.addEventListener('error', function() {
            this.style.display = 'none';
            // Ensure the fallback "SR" is visible
            const profileContainer = this.closest('.profile-image');
            if (profileContainer) {
                profileContainer.classList.add('image-error');
            }
        });
        
        // If image loads successfully, hide the fallback
        img.addEventListener('load', function() {
            const profileContainer = this.closest('.profile-image');
            if (profileContainer) {
                profileContainer.classList.remove('image-error');
            }
        });
        
        // Check immediately if image is already broken
        if (img.complete && img.naturalHeight === 0) {
            img.style.display = 'none';
            const profileContainer = img.closest('.profile-image');
            if (profileContainer) {
                profileContainer.classList.add('image-error');
            }
        }
    });
}
