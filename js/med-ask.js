function sendAiPrompt(text) {
  document.getElementById('aiInput').value = text;
  handleAiSend();
}

function handleAiSend() {
  const input = document.getElementById('aiInput');
  const q = input.value.trim();
  if (!q) return;
  const safeQ = escapeHtml(q);

  const box = document.getElementById('aiChatBox');
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-user';
  userDiv.innerHTML = `<div style="font-size:0.75rem; opacity:0.8; margin-bottom:4px;">${escapeHtml(currentUser || 'Kamu')} · Baru saja</div>${safeQ}`;
  box.appendChild(userDiv);

  const aiDiv = document.createElement('div');
  aiDiv.className = 'chat-ai';
  aiDiv.innerHTML = `
    <span class="eyebrow">MED ASK AI · BARU SAJA</span>
    <h3 style="font-size:1.2rem; margin-bottom:6px;">Langkah sederhana yang bisa dicoba.</h3>
    <p style="margin-bottom:8px;">Terkait pertanyaanmu mengenai <em>"${safeQ}"</em>, mulailah dengan mengamati pola harianmu, mencukupi cairan, dan beristirahat cukup.</p>
    <p class="article-meta">Jawaban AI adalah edukasi umum. Konsultasikan dengan dokter di menu Konsultasi bila keluhan berlanjut.</p>
  `;
  box.appendChild(aiDiv);
  input.value = '';
}
