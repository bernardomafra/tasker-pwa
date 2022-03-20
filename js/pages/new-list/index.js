const newListForm = document.getElementById('new-list-form');

newListForm.addEventListener('submit', createList);

function createList(event) {
  event.preventDefault();
  // get form input values
  const name = event.target.name.value;
  const description = event.target.description.value;
  const response = setListInLocalStorage(name, description);

  if (response.success) {
    console.log('here');
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
    text: response.message || 'Não foi possível criar a lista',
    timeout: 3000,
  });
}
