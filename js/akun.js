function performLogin() {
  const nameVal = document.getElementById('loginNameInput').value.trim() || 'Alya';
  setCurrentUser(nameVal);
  navigateTo('dashboard');
}

function renderSavedHistory() {
  const list = document.getElementById('dashboardHistoryList');
  if (!list) return;
  Store.get('medall_history', []).forEach(entry => {
    const item = document.createElement('div');
    item.className = 'card';
    const title = document.createElement('strong');
    title.textContent = entry.title;
    const meta = document.createElement('div');
    meta.className = 'article-meta';
    meta.textContent = entry.meta;
    item.append(title, meta);
    list.prepend(item);
  });
}

renderSavedHistory();
