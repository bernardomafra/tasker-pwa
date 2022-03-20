const taskList = document.getElementById('task-list');

window.addEventListener('load', () => {
  console.log('loaded');
  const lists = getListsFromLocalStorage();
  console.log('lists: ', lists);

  if (!lists.length) return emptyStateMessage();

  lists.forEach((list) => {
    const listElement = createListElement(list);
    taskList.appendChild(listElement);
  });
});

function emptyStateMessage() {
  const emptyState = document.createElement('section');
  emptyState.classList.add('empty-state');
  emptyState.innerHTML = `
    <h2>Você não tem nenhuma lista ainda.</h2>
    <p>Clique no botão abaixo para criar uma nova lista.</p>
    <a class="primary-btn" href="/new-list.html">Nova lista</a>
  `;
  taskList.remove();
  document.body.appendChild(emptyState);
}

function createListElement(list) {
  const li = document.createElement('li');
  li.innerHTML = `
      <section class="list-data">
        <h2 class="limitted-text">${list.name}</h2>
        <p class="limitted-text">${list.description}</p>
      </section>
      <aside class="list-actions">${list.tasks.length || 0}</aside>
    `;
  return li;
}
