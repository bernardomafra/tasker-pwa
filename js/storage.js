function getListsFromLocalStorage() {
  const lists = localStorage.getItem('lists');
  return lists ? JSON.parse(lists) : [];
}

function getListFromLocalStorage(listId) {
  const lists = JSON.parse(localStorage.getItem('lists'));
  return lists.find(list => +list.id === +listId)
}

function getTaskFromLocalStorage(listId, taskId) {
  const lists = JSON.parse(localStorage.getItem('lists'));
  const list = lists.find(list => +list.id === +listId)
  return list.tasks.find(task => +task.id === +taskId)
}

function setListInLocalStorage(list, listExists) {
  if (listExists) return updateListInLocalStorage(list) 
  
  if (!list.name)
    return {
      success: false,
      message: 'O nome da lista é obrigatório',
    };

  const lists = getListsFromLocalStorage();
  if (lists.some((storageList) => storageList.name.toLowerCase() === list.name.toLowerCase()))
    return {
      success: false,
      message: `Já existe uma lista com o nome ${list.name}`,
    };

  const listId = lists.length + 1;
  const newList = {
    id: listId,
    name: list.name,
    description: list.description,
    tasks: [],
  };
  lists.push(newList);
  localStorage.setItem('lists', JSON.stringify(lists));
  return {
    success: true,
    message: `List ${list.name} cadastrada com sucesso!`,
    data: newList,
  };
}

function setTaskInLocalStorage(task, listId, taskExists) {
  if (taskExists) return updateTaskInLocalStorage(task, listId) 
  
  if (!task.name)
    return {
      success: false,
      message: 'O nome da tarefa é obrigatório',
    };

  const allLists = getListsFromLocalStorage();
  const list = allLists.find((list) => +list.id === +listId);
  if (!Array.isArray(list.tasks)) list.tasks = []
  if (list.tasks.find((listTask) => listTask.name.toLowerCase() === task.name.toLowerCase())) 
    return {
      success: false,
      message: `Já existe uma tarefa na lista com o nome ${task.name}`,
      data: null,
    };

  const taskId = list.tasks.length + 1;
  const newTask = {
    id: taskId,
    name: task.name,
    description: task.description,
  };
  list.tasks.push(newTask);
  const listIndex = allLists.findIndex(listToFind => +listToFind.id === +list.id)
  allLists[listIndex] = list;
  localStorage.setItem('lists', JSON.stringify(allLists));
  return {
    success: true,
    message: `Tarefa ${task.name} cadastrada com sucesso na lista ${list.name}!`,
    data: newTask,
  };
}

function deleteTaskInLocalStorage(listId, taskId) {
  if (!taskId || !listId)
    return {
      success: false,
      message: 'Tarefa não encontrada',
      data: null,
    };

  const allLists = getListsFromLocalStorage();
  const list = allLists.find((list) => +list.id === +listId);
  list.tasks = list.tasks.filter((task) => +task.id !== +taskId);
  const listIndex = allLists.findIndex(listToFind => +listToFind.id === +list.id)
  allLists[listIndex] = list;
  localStorage.setItem('lists', JSON.stringify(allLists));

  return {
    success: true,
    message: `Tarefa ${taskId} excluída com sucesso!`,
    data: taskId,
  };
}

function deleteListInLocalStorage(listId) {
  if (!listId)
    return {
      success: false,
      message: 'Lista não encontrada',
      data: null,
    };

  let allLists = getListsFromLocalStorage();

  if (!allLists.find((list) => +list.id === +listId)) {
    return {
      success: false,
      message: 'Lista não encontrada',
      data: null,
    };
  }

  if (allLists.length === 1) {
    localStorage.removeItem('lists');
    return {
      success: true,
      message: 'Lista excluída com sucesso!',
      data: listId,
    };
  }

  allLists = allLists.filter((list) => +list.id !== +listId);
  localStorage.setItem('lists', JSON.stringify(allLists));

  return {
    success: true,
    message: `Lista excluída com sucesso!`,
    data: listId,
  };
}

function updateTaskInLocalStorage(task, listId) {
  if (!task || !listId) return {
    success: false,
    message: 'Erro ao atualizar tarefa',
    data: null,
  };

  const allLists = getListsFromLocalStorage();
  const list = allLists.find((list) => +list.id === +listId);
  if (!list)
    return {
      success: false,
      message: `Não existe uma lista com a tarefa ${task.name}`,
      data: null,
    };

  const taskIndex = list.tasks.findIndex(listTask => +listTask.id === +task.id)
  list.tasks[taskIndex] = task

  const listIndex = allLists.findIndex(listToFind => +listToFind.id === +list.id)
  allLists[listIndex] = list;
  localStorage.setItem('lists', JSON.stringify(allLists));
  return {
    success: true,
    message: `Tarefa ${task.name} editada com sucesso na lista ${list.name}!`,
    data: task,
  };
}


function updateListInLocalStorage(list) {
  if (!list) return {
    success: false,
    message: 'Erro ao atualizar lista',
    data: null,
  };

  const allLists = getListsFromLocalStorage();
  const listInLocalStorage = allLists.find((storageList) => +storageList.id === +list.id)
  if (!listInLocalStorage)
    return {
      success: false,
      message: `Não existe a lista ${list.name}`,
      data: null,
    };

  const listIndex = allLists.findIndex(listToFind => +listToFind.id === +list.id)
  list.tasks = listInLocalStorage.tasks
  
  allLists[listIndex] = list;
  localStorage.setItem('lists', JSON.stringify(allLists));
  return {
    success: true,
    message: `Lista ${list.name} editada com sucesso!`,
    data: list,
  };
}
