const newListForm = document.querySelector('form');

newListForm.addEventListener('submit', create);

function create(event) {
  event.preventDefault();
  // get form input values
  const name = event.target.name.value;
  const description = event.target.description.value;
  const response = setListInLocalStorage(name, description);

  if (response.success) {
    event.target.reset();

    toast.create({
      type: 'success',
      title: 'Sucesso!',
      text: response.message,
      timeout: 3000,
    });

    console.log('here', response.data)
    window.location.href = `/list.html?id=${response.data.id}`;
  } else {
    return toast.create({
      type: 'error',
      title: 'Erro!',
      text: response.message || 'Não foi possível criar a lista',
      timeout: 3000,
    });
  }
}
