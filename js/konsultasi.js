let selectedDoctor = { name: 'dr. Maya Putri', fee: 'Rp75.000', time: '10.00' };

function filterDoctors(btn, spec) {
  btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#doctorGrid .doctor-card').forEach(card => {
    card.style.display = (spec === 'Semua' || card.dataset.spec === spec) ? 'block' : 'none';
  });
}

function openDoctorProfile(name, meta, fee, img) {
  selectedDoctor.name = name;
  selectedDoctor.fee = fee;
  document.getElementById('docProfileName').textContent = name;
  document.getElementById('docProfileMeta').textContent = meta;
  document.getElementById('docProfileFee').textContent = fee;
  document.getElementById('docProfileImg').src = img;
  navigateTo('profil-dokter');
}

function pickSlot(btn) {
  btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function pickTime(btn) {
  btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedDoctor.time = btn.textContent;
}

function confirmBooking() {
  document.getElementById('bookedDocName').textContent = selectedDoctor.name;
  document.getElementById('bookedFee').textContent = selectedDoctor.fee;
  document.getElementById('bookedTime').textContent = selectedDoctor.time;
  navigateTo('konsultasi-saya');
}
