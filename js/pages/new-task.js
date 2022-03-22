window.addEventListener('load', () => {
  const listId = getUrlParam('listId');

  const newListForm = document.querySelector('form');

  newListForm.addEventListener('submit', create);

  function create(event) {
    event.preventDefault();
    // get form input values
    const name = event.target.name.value;
    const description = event.target.description.value;
    const task = { name, description };
    const response = setTaskInLocalStorage(task, listId);

    if (response.success) {
      // clear form
      event.target.reset();
      // show success message
      return toast.create({
        type: 'success',
        title: 'Sucesso!',
        text: response.message,
        timeout: 3000,
      });
    }

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
});
