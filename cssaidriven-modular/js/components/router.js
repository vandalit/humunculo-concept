import { loadPartial } from './partialLoader.js';

export const router = {
    currentView: null,
    history: [],
    
    init() {
        window.addEventListener('hashchange', () => {
            const view = window.location.hash.substring(1) || 'login';
            this.navigateTo(view, false);
        });
    },
    
    async navigateTo(view, addToHistory = true) {
        if (this.currentView === view) return;
        
        try {
            // Load the partial
            const html = await loadPartial(`partials/${view}.html`);
            
            // Update the app container
            document.getElementById('app').innerHTML = html;
            
            // Update current view
            this.currentView = view;
            
            // Add to history if needed
            if (addToHistory) {
                this.history.push(view);
                window.location.hash = view;
            }
            
            // Initialize any view-specific JS
            this.initView(view);
            
        } catch (error) {
            console.error('Failed to load view:', error);
            // Fallback to login if view doesn't exist
            if (view !== 'login') {
                this.navigateTo('login');
            }
        }
    },
    
    back() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current view
            const previousView = this.history.pop();
            this.navigateTo(previousView);
        } else {
            this.navigateTo('login');
        }
    },
    
    initView(view) {
        // View-specific initialization
        switch(view) {
            case 'dashboard':
                initDashboard();
                break;
            case 'job-detail':
                initJobDetail();
                break;
            // Add other view initializers as needed
        }
    }
};

function initDashboard() {
    // Dashboard-specific JS
    console.log('Dashboard initialized');
}

function initJobDetail() {
    // Job detail-specific JS
    console.log('Job detail initialized');
}