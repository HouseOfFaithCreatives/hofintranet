document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.dataset.page || 'home';

  // Top navigation header template matching horizontal top bar design
  const headerHTML = `
    <header class="hof-navbar">
      <div class="hof-nav-container">
        <!-- Brand / Logo Area -->
        <a href="index.html" class="hof-brand">
          <div class="hof-logo-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
            </svg>
          </div>
          <div class="hof-brand-text">
            <span class="brand-title">House of Faith</span>
            <span class="brand-subtitle">Intranet</span>
          </div>
        </a>

        <!-- Desktop Navigation Items -->
        <nav class="hof-nav-links">
          <a href="index.html" class="hof-nav-item ${currentPage === 'home' ? 'active' : ''}" data-page="home">Home</a>
          
          <div class="hof-dropdown">
            <a href="team.html" class="hof-nav-item ${currentPage === 'team' ? 'active' : ''}" data-page="team">
              Team
              <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
          </div>

          <div class="hof-dropdown">
            <a href="management.html" class="hof-nav-item ${currentPage === 'management' ? 'active' : ''}" data-page="management">
              Management
              <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
          </div>

          <!-- Quick Search Icon -->
          <button class="hof-search-btn" aria-label="Search intranet">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button class="hof-mobile-toggle" id="hofNavToggle" aria-label="Toggle navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      <!-- Mobile Dropdown Drawer -->
      <div class="hof-mobile-menu" id="hofMobileMenu">
        <a href="index.html" class="hof-mobile-link ${currentPage === 'home' ? 'active' : ''}">Home</a>
        <a href="team.html" class="hof-mobile-link ${currentPage === 'team' ? 'active' : ''}">Team</a>
        <a href="management.html" class="hof-mobile-link ${currentPage === 'management' ? 'active' : ''}">Management</a>
      </div>
    </header>
  `;

  // Prepend navigation to the top of body
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Handle Mobile Navigation Toggle
  const toggleBtn = document.getElementById('hofNavToggle');
  const mobileMenu = document.getElementById('hofMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
});
