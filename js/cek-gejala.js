let selectedSeverity = 'Ringan';

function pickSeverity(btn, level) {
  selectedSeverity = level;
  document.querySelectorAll('.sev-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function showSymptomSummary() {
  const keluhan = document.getElementById('symptomInput').value.trim() || 'Sakit kepala';
  const durasi = document.getElementById('symptomDuration').value;
  document.getElementById('summarySymptomTitle').textContent = keluhan;
  document.getElementById('summarySymptomMeta').textContent = `${selectedSeverity} · ${durasi}`;
  navigateTo('ringkasan-gejala');
}

function saveSymptomToDashboard() {
  const keluhan = document.getElementById('summarySymptomTitle').textContent;

  const history = Store.get('medall_history', []);
  history.push({
    title: `Cek gejala · ${keluhan}`,
    meta: `${selectedSeverity} · Baru saja disimpan`
  });
  Store.set('medall_history', history);

  if (!currentUser) setCurrentUser('Alya');
  navigateTo('dashboard');
}
