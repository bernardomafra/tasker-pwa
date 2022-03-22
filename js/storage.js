function getListsFromLocalStorage() {
  const lists = localStorage.getItem('lists');
  return lists ? JSON.parse(lists) : [];
}

function setListInLocalStorage(listName, listDescription, tasks = []) {
  if (!listName)
    return {
      success: false,
      message: 'O nome da lista é obrigatório',
    };

  const lists = getListsFromLocalStorage();
  if (lists.some((list) => list.name === listName))
    return {
      success: false,
      message: `Já existe uma lista com o nome ${listName}`,
    };

  const listId = lists.length + 1;
  lists.push({
    id: listId,
    name: listName,
    description: listDescription,
    tasks,
  });
  localStorage.setItem('lists', JSON.stringify(lists));
  return {
    success: true,
    message: `List ${listName} cadastrada com sucesso!`,
  };
}

function setTaskInLocalStorage(task, listId) {
  if (!task.name)
    return {
      success: false,
      message: 'O nome da tarefa é obrigatório',
    };

  const allLists = getListsFromLocalStorage();
  const list = allLists.find((list) => +list.id === +listId);
  if (list.find)
    return {
      success: false,
      message: `Já existe uma tarefa na lista com o nome ${task.name}`,
    };

  const taskId = list.tasks.length + 1;
  const newTask = {
    id: taskId,
    name: task.name,
    description: task.description,
  };
  list.tasks.push(newTask);

  allLists.splice(listId - 1, 1);
  localStorage.setItem('lists', JSON.stringify(allLists));
  return {
    success: true,
    message: `Tarefa ${task.name} cadastrada com sucesso na lista ${list.name}!`,
  };
}

function deleteTaskInLocalStorage(listId, taskId) {
  if (!taskId || !listId)
    return {
      success: false,
      message: 'Tarefa não encontrada',
    };

  const allLists = getListsFromLocalStorage();
  const list = allLists.find((list) => +list.id === +listId);
  list.tasks = list.tasks.filter((task) => +task.id !== +taskId);
  allLists[listId - 1] = list;
  localStorage.setItem('lists', JSON.stringify(allLists));

  return {
    success: true,
    message: `Tarefa ${taskId} excluída com sucesso!`,
  };
}

function deleteListInLocalStorage(listId) {
  if (!listId)
    return {
      success: false,
      message: 'Lista não encontrada',
    };

  let allLists = getListsFromLocalStorage();

  if (!allLists.find((list) => +list.id === +listId)) {
    return {
      success: false,
      message: 'Lista não encontrada',
    };
  }

  if (allLists.length === 1) {
    localStorage.removeItem('lists');
    return {
      success: true,
      message: 'Lista excluída com sucesso!',
    };
  }

  allLists = allLists.filter((list) => +list.id !== +listId);
  localStorage.setItem('lists', JSON.stringify(allLists));

  return {
    success: true,
    message: `Lista excluída com sucesso!`,
  };
}
