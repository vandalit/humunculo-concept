import { router } from './components/router.js';
import { processIncludes } from './components/include.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set up the router
    router.init();
    
    // Process any includes in the initial page
    processIncludes();
    
    // Load initial view based on URL or default to login
    const initialView = window.location.hash.substring(1) || 'login';
    router.navigateTo(initialView);
    
    // Set up navigation event listeners
    setupNavigation();
});

function setupNavigation() {
    // Handle navbar clicks
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-nav]') || e.target.closest('[data-nav]')) {
            e.preventDefault();
            const target = e.target.closest('[data-nav]').getAttribute('data-nav');
            router.navigateTo(target);
        }
        
        // Handle back buttons
        if (e.target.matches('.back-button') || e.target.closest('.back-button')) {
            e.preventDefault();
            router.back();
        }
    });
}

// Make router available globally for HTML onclick attributes
window.router = router;