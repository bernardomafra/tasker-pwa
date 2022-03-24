window.addEventListener('load', () => {
  const listId = getUrlParam('listId');
  const taskId = getUrlParam('id');
  const isEditting = !!taskId

  
  const newListForm = document.querySelector('form');

  newListForm.addEventListener('submit', create);

  if (isEditting) handleEdit(taskId, listId);

  function create(event) {
    event.preventDefault();
    // get form input values
    
    const name = event.target.name.value;
    const description = event.target.description.value;
    const task = { name, description };

    if (isEditting) task.id = taskId
    
    const response = setTaskInLocalStorage(task, listId, isEditting);

    if (response.success) {
      // clear form
      event.target.reset();
      // show success message
      toast.create({
        type: 'success',
        title: 'Sucesso!',
        text: response.message,
        timeout: 3000,
      });

      console.log('here')
      window.location.href = `/list.html?id=${listId}`;
    } else
      return toast.create({
        type: 'error',
        title: 'Erro!',
        text: response.message || 'Não foi possível criar a tarefa',
        timeout: 3000,
      });
  }

  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    return value;
  }

  function handleEdit(taskId, listId) {
    const task = getTaskFromLocalStorage(listId, taskId)
    
    document.querySelector('h1.title').innerHTML = 'Editar<br/>Tarefa'
    document.querySelector('form button').innerHTML = 'Salvar'
    document.getElementById('name').value = task.name
    document.getElementById('description').value = task.description
  }
});

