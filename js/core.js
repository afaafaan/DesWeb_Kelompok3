const ROUTES = {
  'beranda': 'index.html',
  'artikel': 'artikel.html',
  'detail-artikel': 'artikel.html',
  'konsultasi': 'konsultasi.html',
  'profil-dokter': 'konsultasi.html',
  'konsultasi-saya': 'konsultasi.html',
  'komunitas': 'komunitas.html',
  'detail-thread': 'komunitas.html',
  'cek-gejala': 'cek-gejala.html',
  'ringkasan-gejala': 'cek-gejala.html',
  'med-ask': 'med-ask.html',
  'login': 'akun.html',
  'dashboard': 'akun.html'
};

const NAV_MAP = {
  'beranda': 'beranda',
  'artikel': 'artikel',
  'detail-artikel': 'artikel',
  'konsultasi': 'konsultasi',
  'profil-dokter': 'konsultasi',
  'konsultasi-saya': 'konsultasi',
  'komunitas': 'komunitas',
  'detail-thread': 'komunitas'
};

const CURRENT_PAGE = location.pathname.split('/').pop() || 'index.html';

const Store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* abaikan */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* abaikan */ }
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

let currentUser = Store.get('medall_user', null);
let fontScale = Store.get('medall_font', 1);

function renderLayout() {
  const header = `
  <header class="site-header">
    <div class="header-inner">
      <div class="brand-link" onclick="navigateTo('beranda')">
        <img src="assets/logo-medall.png" alt="Logo Med-all" class="brand-logo-img"
             onerror="this.style.display='none'; document.getElementById('logoFallback').style.display='flex';">
        <div id="logoFallback" class="brand-fallback" style="display:none;">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" stroke="#2E4831" stroke-width="3" fill="#EDF1E5"/>
            <path d="M18 10V26M10 18H26" stroke="#2E4831" stroke-width="4" stroke-linecap="round"/>
          </svg>
          <span>Med-all</span>
        </div>
      </div>

      <nav class="nav-links" aria-label="Navigasi Utama">
        <button class="nav-item" data-nav="beranda" onclick="navigateTo('beranda')">Beranda</button>
        <button class="nav-item" data-nav="artikel" onclick="navigateTo('artikel')">Artikel</button>
        <button class="nav-item" data-nav="konsultasi" onclick="navigateTo('konsultasi')">Konsultasi</button>
        <button class="nav-item" data-nav="komunitas" onclick="navigateTo('komunitas')">Komunitas</button>
      </nav>

      <div class="header-controls">
        <div class="utility-group" title="Atur ukuran teks">
          <button class="util-btn" onclick="changeFontScale(-0.08)">A-</button>
          <button class="util-btn" id="fontResetBtn" onclick="resetFontScale()">A</button>
          <button class="util-btn" onclick="changeFontScale(0.08)">A+</button>
        </div>

        <div class="utility-group" title="Ganti tema tampilan">
          <button class="util-btn" id="themeToggleBtn" onclick="toggleTheme()">Gelap</button>
        </div>

        <button class="btn-account" id="headerAccountBtn" onclick="handleAccountClick()">Masuk</button>
      </div>
    </div>
  </header>`;

  const footer = `
  <div class="modal-backdrop" id="accountModal" onclick="if(event.target===this) closeAccountModal()">
    <div class="modal-sheet">
      <h2 style="font-size:1.65rem; margin-bottom:6px;">Ruang sehat milikmu.</h2>
      <p id="modalUserText" style="font-weight:600; color:var(--brand-olive); margin-bottom:14px;">Akun contoh · Alya</p>
      <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:12px;">
        Riwayat tersimpan selama sesi prototipe ini. Informasi kesehatanmu tidak dikirim ke layanan medis.
      </p>
      <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:22px;">
        Di aplikasi nyata, kamu dapat mengelola izin, mengunduh, dan menghapus data dari pengaturan akun.
      </p>
      <button class="btn-primary" style="width:100%; margin-bottom:10px;" onclick="closeAccountModal(); navigateTo('dashboard')">Kembali ke dashboard</button>
      <button class="btn-outline" style="width:100%; border:none;" onclick="logoutUser()">Keluar dari akun</button>
    </div>
  </div>

  <footer class="site-footer">
    <div class="footer-inner">
      <strong style="font-size:1.05rem;">Med-all · Sehat, bersama.</strong>
      <div class="footer-nav">
        <button onclick="navigateTo('beranda')">Beranda</button>
        <button onclick="navigateTo('artikel')">Artikel</button>
        <button onclick="navigateTo('konsultasi')">Konsultasi</button>
        <button onclick="navigateTo('komunitas')">Komunitas</button>
      </div>
      <p class="footer-copy">
        © 2026 Med-all · Informasi edukasi, bukan pengganti diagnosis. Darurat: 119 / IGD. Profil, jadwal, dan transaksi adalah contoh demonstrasi.
      </p>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.querySelector('main').insertAdjacentHTML('afterend', footer);
}

function showView(viewId, smooth) {
  const views = document.querySelectorAll('.page-view');
  let target = document.getElementById('view-' + viewId);
  if (!target) target = views[0];
  if (!target) return;

  views.forEach(sec => sec.classList.remove('active'));
  target.classList.add('active');

  const activeNav = NAV_MAP[target.id.replace('view-', '')] || '';
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === activeNav);
  });

  if (smooth) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateTo(viewId) {
  const file = ROUTES[viewId];
  if (!file) return;

  const sameFile = file === CURRENT_PAGE;
  if (!sameFile || !document.getElementById('view-' + viewId)) {
    location.href = file + '#' + viewId;
    return;
  }

  if (location.hash === '#' + viewId) {
    showView(viewId, true);
  } else {
    location.hash = viewId; // memicu hashchange
  }
}

window.addEventListener('hashchange', () => showView(location.hash.slice(1), true));

function applyFontScale(scale) {
  fontScale = scale;
  document.documentElement.style.setProperty('--font-scale', scale);
  const resetBtn = document.getElementById('fontResetBtn');
  if (resetBtn) resetBtn.classList.toggle('active', scale === 1);
  Store.set('medall_font', scale);
}

function changeFontScale(delta) {
  applyFontScale(Math.min(1.25, Math.max(0.84, +(fontScale + delta).toFixed(2))));
}

function resetFontScale() {
  applyFontScale(1);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  setText('themeToggleBtn', theme === 'dark' ? 'Terang' : 'Gelap');
  Store.set('medall_theme', theme);
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
}

function setCurrentUser(name) {
  currentUser = name;
  Store.set('medall_user', name);
  updateUserUI();
}

function handleAccountClick() {
  navigateTo(currentUser ? 'dashboard' : 'login');
}

function logoutUser() {
  currentUser = null;
  Store.remove('medall_user');
  closeAccountModal();
  updateUserUI();
  navigateTo('beranda');
}

function updateUserUI() {
  setText('headerAccountBtn', currentUser ? 'Dashboard' : 'Masuk');

  const greeting = document.getElementById('greetingBadge');
  if (greeting) {
    greeting.innerHTML = currentUser
      ? `Halo, <strong>${escapeHtml(currentUser)}</strong> — Selamat datang kembali di ruang sehatmu`
      : 'Halo, Sobat Sehat — Selamat datang di ruang sehatmu';
  }

  if (currentUser) {
    setText('dashUserLabel', `AKUN AKTIF · ${currentUser.toUpperCase()}`);
    setText('aiModeLabel', `MED ASK AI · ${currentUser.toUpperCase()}`);
    setText('modalUserText', `Akun aktif · ${currentUser}`);
  } else {
    setText('aiModeLabel', 'MED ASK AI · MODE TAMU');
  }
}

function openAccountModal() {
  document.getElementById('accountModal').classList.add('open');
}

function closeAccountModal() {
  document.getElementById('accountModal').classList.remove('open');
}

renderLayout();
applyTheme(Store.get('medall_theme', 'light'));
applyFontScale(fontScale);
updateUserUI();
showView(location.hash.slice(1), false);
