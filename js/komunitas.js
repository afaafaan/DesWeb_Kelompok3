function toggleNewThreadBox() {
  const box = document.getElementById('newThreadBox');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function publishThread() {
  const title = document.getElementById('newThreadTitle').value.trim();
  if (!title) return;
  const feed = document.getElementById('communityFeed');
  const card = document.createElement('div');
  card.className = 'card';
  card.style.cursor = 'pointer';
  card.onclick = () => navigateTo('detail-thread');
  card.innerHTML = `<span class="eyebrow">KEBIASAAN SEHAT</span><h3 style="font-size:1.3rem; margin-bottom:6px;">${escapeHtml(title)}</h3><p class="article-meta">${escapeHtml(currentUser || 'Anggota')} · 0 balasan · Baru saja</p>`;
  feed.prepend(card);
  document.getElementById('newThreadTitle').value = '';
  document.getElementById('newThreadBody').value = '';
  toggleNewThreadBox();
}

function incrementSupport() {
  const el = document.getElementById('supportCount');
  el.textContent = parseInt(el.textContent, 10) + 1;
}

function sendReply() {
  const inp = document.getElementById('replyInput');
  const txt = inp.value.trim();
  if (!txt) return;
  const wrap = document.getElementById('threadReplies');
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<strong>${escapeHtml(currentUser || 'Kamu')}</strong> <span class="article-meta">· Baru saja</span><p style="margin-top:6px;">${escapeHtml(txt)}</p>`;
  wrap.appendChild(div);
  inp.value = '';
}
