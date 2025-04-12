import { loadPartial } from "./partialLoader.js";
import { initWorkflow } from "./workflow.js";
import { processIncludes } from "./include.js";

export const router = {
  currentView: null,
  history: [],
  viewInitializers: {
    dashboard: initDashboard,
    "job-detail": initJobDetail,
    "model-selection": initModelSelection,
    "model-config": initModelConfig,
    "find-jobs": initFindJobs,
    "queue-jobs": initQueueJobs,
    profile: initProfile,
    "company-profile": initCompanyProfile,
    login: initLogin,
    onboarding: initOnboarding,
  },

  init() {
    // Set up hash change listener
    window.addEventListener("hashchange", () => {
      const view = window.location.hash.substring(1) || "login";
      this.navigateTo(view, false);
    });

    // Process any initial includes
    processIncludes();
  },

  async navigateTo(view, addToHistory = true) {
    if (this.currentView === view) return;

    try {
      // Load the partial
      const html = await loadPartial(`partials/${view}.html`);

      // Update the app container
      document.getElementById("app").innerHTML = html;

      // Process any includes in the new view
      processIncludes();

      // Update current view
      this.currentView = view;

      // Add to history if needed
      if (addToHistory) {
        this.history.push(view);
        window.location.hash = view;
      }

      // Initialize the view
      this.initView(view);
    } catch (error) {
      console.error("Failed to load view:", error);
      // Fallback to login if view doesn't exist
      if (view !== "login") {
        this.navigateTo("login");
      }
    }
  },

  back() {
    if (this.history.length > 1) {
      this.history.pop(); // Remove current view
      const previousView = this.history.pop();
      this.navigateTo(previousView);
    } else {
      this.navigateTo("login");
    }
  },

  initView(view) {
    // Call view-specific initializer if it exists
    if (this.viewInitializers[view]) {
      this.viewInitializers[view]();
    }

    // Special case for model config to initialize workflow
    if (view === "model-config") {
      initWorkflow();
    }
  },
};

// View initializer functions (stubs - implement as needed)
function initDashboard() {
  console.log("Dashboard initialized");
  // Add dashboard-specific initialization here
}

function initJobDetail() {
  console.log("Job detail initialized");
  // Add job detail-specific initialization here
}

function initModelSelection() {
  console.log("Model selection initialized");
  // Add model selection-specific initialization here
}

function initModelConfig() {
  console.log("Model config initialized");
  // Additional model config initialization (besides workflow)
}

function initFindJobs() {
  console.log("Find jobs initialized");
  // Add find jobs-specific initialization here
}

function initQueueJobs() {
  console.log("Queue jobs initialized");
  // Add queue jobs-specific initialization here
}

function initProfile() {
  console.log("Profile initialized");
  // Add profile-specific initialization here
}

function initCompanyProfile() {
  console.log("Company profile initialized");
  // Add company profile-specific initialization here
}

function initLogin() {
  console.log("Login initialized");
  // Add login-specific initialization here
}

function initOnboarding() {
  console.log("Onboarding initialized");
  // Add onboarding-specific initialization here
}

// Make router available globally for HTML onclick attributes
window.router = router;
