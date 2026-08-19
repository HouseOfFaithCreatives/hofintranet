document.addEventListener("DOMContentLoaded", function () {
  const page = document.body.getAttribute("data-page") || "home";

  const navbarHTML = `
    <header class="hof-navbar">
      <div class="hof-nav-container">
        <!-- Brand Logo -->
        <a href="index.html" class="hof-brand">
          <div class="hof-logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <div class="hof-brand-text">
            <span class="brand-title">House of Faith</span>
            <span class="brand-subtitle">Intranet</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hof-nav-links">
          <a href="index.html" class="hof-nav-item ${page === 'home' ? 'active' : ''}">Home</a>
          <a href="#" class="hof-nav-item ${page === 'team' ? 'active' : ''}">Team</a>
          <a href="#" class="hof-nav-item ${page === 'management' ? 'active' : ''}">Management</a>
        </nav>

        <!-- Right Action Button -->
        <div class="hof-nav-actions">
          <button class="hof-search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button class="hof-mobile-toggle" id="hofMobileToggle" aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div class="hof-mobile-menu" id="hofMobileMenu">
        <a href="index.html" class="hof-mobile-link ${page === 'home' ? 'active' : ''}">Home</a>
        <a href="#" class="hof-mobile-link ${page === 'team' ? 'active' : ''}">Team</a>
        <a href="#" class="hof-mobile-link ${page === 'management' ? 'active' : ''}">Management</a>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // Toggle Mobile Menu
  const toggleBtn = document.getElementById("hofMobileToggle");
  const mobileMenu = document.getElementById("hofMobileMenu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });
  }
});
