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
