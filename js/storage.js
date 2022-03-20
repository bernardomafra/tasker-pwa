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

  lists.push({
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
