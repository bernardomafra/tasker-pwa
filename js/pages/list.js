window.addEventListener('load', () => {
  const listId = getUrlParam('id');
  const lists = getListsFromLocalStorage();
  const footerBottomTab = document.querySelector('footer#tasker-bottom-tab');
  footerBottomTab.addEventListener('click', listConfig);
  createBottomTabButtonsElement();

  window.onTabClick = (event) => {
    const actionName = event.target.name;
    const actions = {
      check: checkTask,
      uncheck: uncheckTask,
      plus: () => (window.location.href = `/new-task.html?listId=${listId}`),
      delete: () => {
        const { element, task } = getSelectedTask();
        if (task) deleteTask(element, task);
        else createBottomTabWarningElement();
      },
      edit: () => {
        const { task } = getSelectedTask();
        if (task)
          window.location.href = `/new-task.html?id=${task.id}&listId=${listId}`;
        else window.location.href = `/new-list.html?id=${listId}`;
      },
    };

    if (actions[actionName]) actions[actionName]();
  };

  window.filter = (event) => {
    const buttonClicked = event.target;
    const type = buttonClicked.getAttribute('data-filter_type');

    const otherType = type === 'done' ? 'todo' : 'done';
    const otherButton = document.querySelector(
      `button[data-filter_type="${otherType}"]`,
    );
    otherButton.removeAttribute('id');

    if (buttonClicked.getAttribute('id') === 'active_task-filter') {
      buttonClicked.removeAttribute('id');
      showAllTasks();
    } else buttonClicked.setAttribute('id', 'active_task-filter');

    const filters = {
      todo: showOnlyTodoTasks,
      done: showOnlyDoneTasks,
    };

    if (filters[type]) filters[type]();
  };

  window.search = (event) => {
    const searchInput = document.querySelector('#task-filters input');
    const filters = document.querySelectorAll(
      '#task-filters button.primary-btn',
    );

    if (searchInput.style.display === 'none') {
      filters.forEach((button) => (button.style.display = 'none'));
      searchInput.style.display = 'flex';
      event.target.setAttribute('src', 'assets/icons/filter.png');
    } else {
      filters.forEach((button) => (button.style.display = 'flex'));
      searchInput.style.display = 'none';
      event.target.setAttribute('src', 'assets/icons/magnify.png');
    }
  };

  window.onSearchInputChange = (event) => {
    const searchWords = event.target.value;
    const tasksUnMatch = list.tasks.map((storageTask) => ({
      ...storageTask,
      matches: taskMachesKeywords(storageTask, searchWords),
    }));

    if (tasksUnMatch.length) {
      tasksUnMatch.forEach((taskObject) => {
        const taskElement = document.querySelector(
          `li[data-taskid="${+taskObject.id}"`,
        );
        taskObject.matches
          ? showTaskElement(taskElement)
          : hideTaskElement(taskElement);
      });
    }
  };

  window.deleteList = deleteList;

  window.closeBottomTab = () => {
    bottomTab.close({
      callback: () => { switchCenterTab({ type: 'hide' }) },
    });
  };

  window.closeWarning = () => {
    const warningContainer = document.getElementById('warning');
    warningContainer.remove();
    closeBottomTab();
  };

  window.showTaskOptions = (taskId) => {
    const isWarning = footerBottomTab.childNodes[0]?.getAttribute('id') === 'warning'

    if (bottomTab.isOpen && isWarning) {
      switchCenterTab({ type: 'hide' });
      switchCenterTab({
        type: isTaskCompleted(taskId) ? 'uncheck-task' : 'check-task',
      });
    }
    
    if (bottomTab.isOpen && (isTaskSelected(taskId))) {
      return bottomTab.close({
        callback: () => {
          unselectAllTasks();
          switchCenterTab({ type: 'hide' });
        },
      });
    }

    if (!footerBottomTab.hasChildNodes()) createBottomTabButtonsElement();
    
    bottomTab.open({
      callback: () => highlightSelectedTask(taskId),
    });
  };

  const list = lists.find((list) => +list.id === +listId);
  const listHeaderInfo = document.getElementById('list-header-info');
  const tasksContainer = document.getElementById('tasks-container');

  let [title, description] = listHeaderInfo.children;
  title.innerHTML = list.name;
  description.innerHTML = list.description;

  if (!list.tasks?.length) return emptyStateMessage();

  document.getElementById('task-filters').style.display = 'flex';
  list.tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });

  function emptyStateMessage() {
    const emptyState = document.createElement('section');
    emptyState.classList.add('empty-state');
    emptyState.innerHTML = `
    <h2>Voc?? n??o tem nenhuma tarefa ainda...</h2>
    <p>Clique no bot??o abaixo para criar uma nova tarefa.</p>
    <a class="primary-btn" href="/new-task.html?listId=${listId}">Nova tarefa</a>
  `;
    tasksContainer.remove();
    document.body.appendChild(emptyState);
  }

  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    return value;
  }

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
    if (!selectedTask)
      return {
        element: null,
        task: null,
      };

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
          alt="??cone de mais simbolizando nova tarefa"
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
          alt="??cone de mais simbolizando nova tarefa"
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
          alt="??cone de mais simbolizando nova tarefa"
        />
      `;

    return element;
  }

  function createBottomTabWarningElement() {
    const element = document.createElement('div');
    element.setAttribute('id', 'warning');
    element.innerHTML = `
        <header>
          <h4>Aten????o!</h4>
        </header>
        <main>
          <p>
            Tem certeza que deseja excluir a lista
            <span class="limitted-text"
              >${list.name}</span
            >
            e todas suas tarefas ?
          </p>
        </main>
        <footer>
          <button class="primary-btn" onclick="closeWarning()">
            cancelar
          </button>
          <button class="primary-btn" onclick="deleteList()">excluir</button>
        </footer>
      `;

    footerBottomTab.replaceChildren(element);
  }

  function createBottomTabButtonsElement() {
    const element = document.createElement('div');
    element.setAttribute('id', 'buttons');
    element.innerHTML = `
        <button style="display: none" name="edit" class="tab" onclick="onTabClick(event)">
          <img
            src="assets/icons/edit.png"
            alt="??cone de l??pis simbolizando edi????o da tarefa"
          />
        </button>
        <button style="display: none" name="plus" class="tab" onclick="onTabClick(event)">
          <img
            src="assets/icons/plus.png"
            alt="??cone de mais simbolizando nova tarefa"
          />
        </button>
        <button style="display: none" name="delete" class="tab" onclick="onTabClick(event)">
          <img
            src="assets/icons/delete.png"
            alt="??cone de lixeira simbolizando exclus??o de tarefa"
          />
        </button>
      `;
    footerBottomTab.replaceChildren(element);
  }

  function switchCenterTab({ type }) {
    const tabs = footerBottomTab.children[0]?.children;

    if (!tabs) return;

    if (type === 'hide') {
      unselectAllTasks();
      footerBottomTab.children[0]?.remove()
      return;
    }

    tabs[0].style.display = 'flex';
    tabs[1].style.display = 'flex';
    tabs[2].style.display = 'flex';
    
    if (type === 'check-task') {
      tabs[1].replaceWith(createCheckElement());
    } else if (type === 'uncheck-task') {
      tabs[1].replaceWith(createUnCheckElement());
    } else if (type === 'list-config') {
      tabs[1].replaceWith(createNewTaskElement());
    }
  }

  function listConfig(event) {
    if (event.target.id === 'tasker-bottom-tab') {
      if (bottomTab.isOpen) {
        bottomTab.close({
          callback: () => switchCenterTab({ type: 'hide' }),
        });
      } else {
        if (!footerBottomTab.hasChildNodes()) createBottomTabButtonsElement();
        bottomTab.open({
          callback: () => switchCenterTab({ type: 'list-config' }),
        });
      }
    }
  }

  function checkTask() {
    const { element, task } = getSelectedTask();
    element.setAttribute('data-completed', true);
    task.completed = true;
    updateTaskInLocalStorage(task, listId);
    switchCenterTab({ type: 'uncheck-task' });
  }

  function uncheckTask() {
    const { element, task } = getSelectedTask();
    element.setAttribute('data-completed', false);
    task.completed = false;
    updateTaskInLocalStorage(task, listId);
    switchCenterTab({ type: 'check-task' });
  }

  function deleteTask(element, task) {
    const { success, message } = deleteTaskInLocalStorage(list.id, task.id);

    if (success) {
      element.remove();

      toast.create({
        type: 'success',
        title: 'Sucesso!',
        text: message,
        timeout: 3000,
      });
    } else {
      toast.create({
        type: 'error',
        title: 'Erro!',
        text: message,
        timeout: 3000,
      });
    }

    bottomTab.close({
      callback: () => {
        unselectAllTasks();
        switchCenterTab({ type: 'hide' });
      },
    });
  }

  function deleteList() {
    const { success, message } = deleteListInLocalStorage(list.id);

    if (success) {
      window.location.href = '/index.html';
    } else {
      toast.create({
        type: 'error',
        title: 'Erro!',
        text: message,
        timeout: 3000,
      });
    }
  }

  function showOnlyTodoTasks() {
    for (const task of tasksContainer.children) {
      if (task.getAttribute('data-completed') === 'true')
        task.setAttribute('data-task_hidden', true);
      else task.removeAttribute('data-task_hidden');
    }
  }

  function showOnlyDoneTasks() {
    for (const task of tasksContainer.children) {
      if (task.getAttribute('data-completed') !== 'true')
        task.setAttribute('data-task_hidden', true);
      else task.removeAttribute('data-task_hidden');
    }
  }

  function showAllTasks() {
    window.location.reload();
  }

  function hideTaskElement(element) {
    element.style.width = '0px';
    element.style.height = '0px';
    element.style.padding = '0px';
  }

  function showTaskElement(element) {
    element.style.width = '100%';
    element.style.height = '6rem';
    element.style.padding = '0.5rem';
  }

  function taskMachesKeywords(taskToCompare, keyWords) {
    return (
      taskToCompare.name.match(new RegExp(keyWords, 'i')) ||
      taskToCompare.description?.match(new RegExp(keyWords, 'i'))
    );
  }
});
