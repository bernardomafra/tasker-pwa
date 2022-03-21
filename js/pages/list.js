window.addEventListener('load', () => {
  const lists = getListsFromLocalStorage();
  const footerBottomTab = document.querySelector('footer#tasker-bottom-tab');

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
    if (bottomTab.isOpen && isTaskSelected(taskId)) {
      return bottomTab.close({
        callback: () => {
          unselectAllTasks();
          switchCenterTab({ type: 'hide' });
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
    switchCenterTab({
      type: isTaskCompleted(taskId) ? 'uncheck-task' : 'check-task',
    });
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

  function getSelectedTask() {
    const selectedTask = document.querySelector('.selected');
    const taskId = selectedTask.getAttribute('data-taskid');
    const taskObject = list.tasks.find((task) => +task.id === +taskId);
    return {
      element: selectedTask,
      task: taskObject,
    };
  }

  function isTaskCompleted(taskId) {
    return list.tasks.find((task) => +task.id === +taskId).completed;
  }

  function createUnCheckElement() {
    const element = document.createElement('button');
    element.setAttribute('name', 'uncheck');
    element.setAttribute('class', 'tab');
    element.addEventListener('click', onTabClick);

    element.innerHTML = `
        <img
          src="assets/icons/uncheck.png"
          alt="ícone de mais simbolizando nova tarefa"
        />
      `;

    return element;
  }

  function createCheckElement() {
    const element = document.createElement('button');
    element.setAttribute('name', 'check');
    element.setAttribute('class', 'tab');
    element.addEventListener('click', onTabClick);

    element.innerHTML = `
        <img
          src="assets/icons/check.png"
          alt="ícone de mais simbolizando nova tarefa"
        />
      `;

    return element;
  }

  function createNewTaskElement() {
    const element = document.createElement('button');
    element.setAttribute('name', 'plus');
    element.setAttribute('class', 'tab');
    element.addEventListener('click', onTabClick);

    element.innerHTML = `
        <img
          src="assets/icons/plus.png"
          alt="ícone de mais simbolizando nova tarefa"
        />
      `;

    return element;
  }

  function switchCenterTab({ type }) {
    const middleTab = footerBottomTab.children[1];

    if (type === 'hide') {
      unselectAllTasks();
      middleTab.style.display = 'none';
      return;
    }

    if (type === 'check-task') {
      middleTab.replaceWith(createCheckElement());
    } else if (type === 'uncheck-task') {
      middleTab.replaceWith(createUnCheckElement());
    } else if (type === 'list-config') {
      middleTab.replaceWith(createNewTaskElement());
    }
  }

  function listConfig(event) {
    if (event.target.id === 'tasker-bottom-tab') {
      if (bottomTab.isOpen) {
        bottomTab.close({
          callback: () => switchCenterTab({ type: 'hide' }),
        });
      } else
        bottomTab.open({
          callback: () => switchCenterTab({ type: 'list-config' }),
        });
    }
  }

  function checkTask() {
    const { element, task } = getSelectedTask();
    element.setAttribute('data-completed', true);
    task.completed = true;
  }

  function uncheckTask() {
    const { element, task } = getSelectedTask();
    element.setAttribute('data-completed', false);
    task.completed = false;
  }

  window.onTabClick = (event) => {
    const actionName = event.target.name;

    const actions = {
      check: checkTask,
      uncheck: uncheckTask,
      plus: () => (window.location.href = '/new-task.html'),
    };

    if (actions[actionName]) actions[actionName]();
  };

  footerBottomTab.addEventListener('click', listConfig);
});
