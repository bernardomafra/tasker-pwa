window.addEventListener('load', () => {
  const listId = getUrlParam('id');
  const isEditting = !!listId
  
  const newListForm = document.querySelector('form');

  if (isEditting) handleEdit(listId);
  
  newListForm.addEventListener('submit', create);
  
  function create(event) {
    event.preventDefault();
    // get form input values
    const name = event.target.name.value;
    const description = event.target.description.value;
    const list = {
      name,
      description,
    }
    if (isEditting) list.id = listId

    const response = setListInLocalStorage(list, isEditting);
  
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

  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    return value;
  }
  
  function handleEdit(listId) {
    const list = getListFromLocalStorage(listId)
    
    document.querySelector('h1.title').innerHTML = 'Editar<br/>Lista'
    document.querySelector('form button').innerHTML = 'Salvar'
    document.getElementById('name').value = list.name
    document.getElementById('description').value = list.description
  }
})
