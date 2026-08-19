document.write(`
<div class="bs-topbar" id="bsTopbar">
  <div class="bs-topbar-logo">
    <img src="assets/logo/faithstream_icon_purple.png" alt="FaithStream" class="bs-logo-mark" onerror="this.outerHTML='<div class=\\'bs-logo-mark\\'>✦</div>'">
    FAITHSTREAM
  </div>
  <button class="bs-hamburger" id="bsHamburger" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</div>
<div class="bs-drawer-backdrop" id="bsDrawerBackdrop"></div>
<aside class="bs-sidebar" id="bsSidebar">
  <div class="bs-logo">
    <img src="assets/logo/faithstream_icon_purple.png" alt="FaithStream" class="bs-logo-mark" onerror="this.outerHTML='<div class=\\'bs-logo-mark\\'>✦</div>'">
    FAITHSTREAM
  </div>
  <div class="bs-subtitle">Brand System — v1.0</div>

  <div class="bs-nav-group">
    <div class="bs-nav-item" data-page="index" onclick="location.href='index.html'">
      <span class="bs-nav-num">00</span>Overview
    </div>
  </div>

  <div class="bs-nav-group">
    <div class="bs-nav-label">Strategy</div>
    <div class="bs-nav-item" data-page="foundations" onclick="location.href='foundations.html'">
      <span class="bs-nav-num">01</span>Foundations
    </div>
  </div>

  <div class="bs-nav-group">
    <div class="bs-nav-label">Visual Identity</div>
    <div class="bs-nav-item" data-page="identity" onclick="location.href='identity.html'">
      <span class="bs-nav-num">02</span>Logo, Color & Type
    </div>
    <div class="bs-nav-item" data-page="patterns" onclick="location.href='patterns.html'">
      <span class="bs-nav-num">03</span>Motifs & Imagery
    </div>
  </div>

  <div class="bs-nav-group">
    <div class="bs-nav-label">Product</div>
    <div class="bs-nav-item" data-page="components" onclick="location.href='components.html'">
      <span class="bs-nav-num">04</span>Components
    </div>
    <div class="bs-nav-item" data-page="web-ui" onclick="location.href='web-ui.html'">
      <span class="bs-nav-num">05</span>Web & UI System
    </div>
  </div>

  <div class="bs-nav-group">
    <div class="bs-nav-label">Operating</div>
    <div class="bs-nav-item" data-page="governance" onclick="location.href='governance.html'">
      <span class="bs-nav-num">06</span>Governance
    </div>
  </div>
</aside>
`);

document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.dataset.page;
  document.querySelectorAll('.bs-nav-item').forEach(item => {
    if (item.dataset.page === current) item.classList.add('active');
  });

  // ── Hamburger drawer behavior (tablet and phone only — CSS hides
  //    the topbar/hamburger entirely on laptop and desktop) ──
  const sidebar = document.getElementById('bsSidebar');
  const backdrop = document.getElementById('bsDrawerBackdrop');
  const hamburger = document.getElementById('bsHamburger');

  function openDrawer() {
    sidebar.classList.add('open');
    backdrop.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleDrawer() {
    if (sidebar.classList.contains('open')) closeDrawer(); else openDrawer();
  }

  hamburger.addEventListener('click', toggleDrawer);
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  // Close the drawer automatically once a nav item is tapped
  // (the click also navigates via the inline onclick already on each item)
  sidebar.querySelectorAll('.bs-nav-item').forEach(item => {
    item.addEventListener('click', closeDrawer);
  });

  // If the viewport is resized past the tablet breakpoint while the
  // drawer happens to be open, reset state so it doesn't get stuck.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) closeDrawer();
  });
});
