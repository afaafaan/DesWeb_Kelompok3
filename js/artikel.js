function selectCategory(btn, cat) {
  btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#articleListGrid .article-card').forEach(card => {
    card.style.display = (cat === 'Semua' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}

function filterArticles() {
  const q = document.getElementById('articleSearch').value.toLowerCase();
  document.querySelectorAll('#articleListGrid .article-card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? 'block' : 'none';
  });
}
