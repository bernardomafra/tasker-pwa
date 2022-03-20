window.addEventListener('load', () => {
  const lists = getListsFromLocalStorage();

  const mockTasks = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      completed: true,
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      completed: false,
    },
  ];

  const listId = getUrlParam('id');
  const list = lists.find((list) => list.id === +listId);
  const listHeaderInfo = document.getElementById('list-header-info');
  const tasks = document.getElementById('tasks-container');

  let [title, description] = listHeaderInfo.children;
  title.innerHTML = list.name;
  description.innerHTML = list.description;
  list.tasks = mockTasks;

  if (!list.tasks.length) return emptyStateMessage();

  document.getElementById('task-filters').style.display = 'flex';
  list.tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasks.appendChild(taskElement);
  });

  function emptyStateMessage() {
    const emptyState = document.createElement('section');
    emptyState.classList.add('empty-state');
    emptyState.innerHTML = `
    <h2>Você não tem nenhuma tarefa ainda.</h2>
    <p>Clique no botão abaixo para criar uma nova tarefa.</p>
    <a class="primary-btn" href="/new-task.html">Nova tarefa</a>
  `;
    tasks.remove();
    document.body.appendChild(emptyState);
  }

  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    return value;
  }

  window.showTaskOptions = (taskId) => {
    console.log(bottomTab.isOpen);
    if (bottomTab.isOpen && isTaskSelected(taskId)) {
      return bottomTab.close({
        callback: () => {
          unselectAllTasks();
        },
      });
    }

    bottomTab.open({
      callback: () => highlightSelectedTask(taskId),
    });
  };

  function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('data-taskid', task.id);
    li.setAttribute('data-completed', task.completed);
    li.innerHTML = `
    <section class="list-data">
    <h2 class="limitted-text">${task.name}</h2>
    <p class="limitted-text">${task.description}</p>
    </section>
    <aside class="list-actions">
    <img onclick="showTaskOptions(${task.id})" width="32px" height="32px" src="assets/icons/settings.png" alt="list settings icon" />
    </aside>
    `;
    return li;
  }

  function highlightSelectedTask(taskId) {
    const selectedTasks = document.querySelectorAll('.selected');

    selectedTasks.forEach(
      (task) => task.id !== taskId && task.classList.remove('selected'),
    );

    const taskElement = document.querySelector(`li[data-taskid="${taskId}"]`);
    if (taskElement.classList.contains('selected'))
      taskElement.classList.remove('selected');
    taskElement.classList.add('selected');
  }

  function unselectAllTasks() {
    const selectedTasks = document.querySelectorAll('.selected');
    selectedTasks.forEach((task) => task.classList.remove('selected'));
  }

  function isTaskSelected(taskId) {
    const taskElement = document.querySelector(`li[data-taskid="${taskId}"]`);
    return taskElement.classList.contains('selected');
  }
});
