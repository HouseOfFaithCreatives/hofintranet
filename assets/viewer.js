/* ════════════════════════════════════════════════════════════
   HOUSE OF FAITH INTRANET — shared UI scripts
   • mobile nav drawer
   • document viewer (modal reader)
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Mobile nav ── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }

  /* ── Document viewer ── */
  var overlay = document.getElementById('docViewer');
  if (!overlay) return;

  var elTitle = overlay.querySelector('.dv-title');
  var elSub = overlay.querySelector('.dv-sub');
  var elBody = overlay.querySelector('.dv-body');
  var btnDrive = overlay.querySelector('[data-dv="drive"]');
  var btnDownload = overlay.querySelector('[data-dv="download"]');
  var lastFocus = null;

  function open(card) {
    var key = card.getAttribute('data-doc');
    var tpl = document.getElementById('doc-' + key);
    if (!tpl) return;

    lastFocus = card;
    elTitle.textContent = card.getAttribute('data-title') || '';
    elSub.textContent = card.getAttribute('data-sub') || '';
    elBody.innerHTML = '<div class="pd">' + tpl.innerHTML + '</div>';
    elBody.scrollTop = 0;

    var drive = card.getAttribute('data-drive');
    if (drive) {
      btnDrive.style.display = '';
      btnDrive.setAttribute('href', drive);
    } else {
      btnDrive.style.display = 'none';
    }

    var file = card.getAttribute('data-file');
    if (file) {
      btnDownload.style.display = '';
      btnDownload.setAttribute('href', file);
      btnDownload.setAttribute('download', '');
    } else {
      btnDownload.style.display = 'none';
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.dv-close').focus();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { elBody.innerHTML = ''; }, 240);
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-doc]').forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', function (e) {
      e.preventDefault();
      open(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });

  overlay.querySelector('.dv-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();

/* ════════════════════════════════════════════════════════════
   FaithStream carousel — manual (dots, arrows, swipe, keyboard)
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var root = document.getElementById('fsCarousel');
  if (!root) return;

  var track = document.getElementById('fsTrack');
  var slides = Array.prototype.slice.call(track.children);
  var dots = Array.prototype.slice.call(document.querySelectorAll('#fsDots button'));
  var prev = document.getElementById('fsPrev');
  var next = document.getElementById('fsNext');
  var i = 0;

  function render() {
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach(function (d, n) { d.setAttribute('aria-selected', n === i ? 'true' : 'false'); });
    slides.forEach(function (s, n) {
      s.setAttribute('aria-hidden', n === i ? 'false' : 'true');
      // keep off-screen slides out of the tab order
      s.querySelectorAll('a, button').forEach(function (el) {
        if (n === i) el.removeAttribute('tabindex');
        else el.setAttribute('tabindex', '-1');
      });
    });
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
  }

  function go(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    render();
  }

  prev.addEventListener('click', function () { go(i - 1); });
  next.addEventListener('click', function () { go(i + 1); });
  dots.forEach(function (d, n) { d.addEventListener('click', function () { go(n); }); });

  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
  });

  // touch swipe
  var x0 = null, y0 = null;
  root.addEventListener('touchstart', function (e) {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? i + 1 : i - 1);
    x0 = y0 = null;
  }, { passive: true });

  render();
})();
