<p align="center">  
  <img width="260px" src="assets/logo-no-subtitle.png">
  <h1 align="center"></h1>
</p>

<div align="center" flex-direction="row">

![pwa](https://img.shields.io/static/v1?label=TaskeR&message=PUC%20MG&color=blueviolet&logo=pwa)


![html](https://img.shields.io/badge/HTML-_-important) ![css](https://img.shields.io/badge/CSS-_-9cf) ![js](https://img.shields.io/badge/javascript-_-yellow)
<br />
<h3>
  <br/> Bernardo Martinez de Oliveira Mafra <br/>Tópicos Especiais em Sistemas de Informação: Aplicações Híbridas
</h3>
<br />

### Table of Contents  
[1. Descrição da aplicação](#description)  
[2. Descrição das telas](#screens)  
[3. Explicação dos dados do usuário](#user-data)  
[4. Perguntas para a avaliação do App](#questions)  

<br />


<a name="description" />
<h2 align="center"><b>Descrição da aplicação</b></h2>

  <p>
  A aplicação tem como objetivo controlar diferentes listas de tarefas. É simples mas com
  certeza traz uma agilidade para a organização cotidiana do usuário. Suas atividades
  são simples, podemos criar uma lista de tarefas e atribuir tarefas à ela, ter mais de uma
  lista para assuntos de tarefas diferentes e, por fim, gerenciar o estado de uma lista e de
  suas tarefas.
  </p>

<!-- <section id="photos-grid" >
  <a name="screens" />
  <br />
  <h2 align="center"><b>Telas da aplicação</b></h2>
  <br />

  | _Home Page_ no Navegador   |Adicionar à tela inicial | Aplicativo na tela inicial     |
  |:----------:|:---------:|:--------:|
  | ![example](/docs/home-web.png) Ao abrir no navegador devemos encontrar a opção de adicionar o app à tela| ![example](/docs/aths.png) Ao clicar em adicionar à tela incial, já podemos ver o ícone do app, o nome, e o botão para adicionar| ![example](/docs/app-on-hs.png) Ícone do aplicativo acessível já da tela de aplicativos do dispositivo do usuário|
 
  <hr />

  | _Splashcreen_   | _Home Page_ no dispositivo | Minhas Listas     |
  |:----------:|:---------:|:--------:|
  | ![example](/docs/splashscreen-ios.png) Aparece quando o usuário abre o aplicativo, antes de carregar completamente a primeira página| ![example](/docs/home-app.png) Visão da página Home quando o aplicativo já está instalado no celular, sem a barra do navegador| ![example](/docs/my-lists-es.png) Tela onde o usuário vê as suas listas, e se não houver, vê-se um empty-state com um botão _CTA_|
  
  <hr />

  | Nova Lista   | Página da Lista | Nova Tarefa     |
  |:----------:|:---------:|:--------:|
  | ![example](/docs/new-list.png) Tela de criação de uma nova lista, onde deve ser informado o nome e uma descrição (opcional)| ![example](/docs/list-page-es.png) Tela onde o usuário vê as tarefas daquela lista, e caso não tenha tarefas, um empty-state com _CTA_| ![example](/docs/new-task.png) Tela de criação de uma nova tarefa, onde deve ser informado o nome e uma descrição (opcional)
  
  <hr />

  | Lista - Configuração de tarefa  | Lista - Estado de tarefas | Lista - Filtro por estado     |
  |:----------:|:---------:|:--------:|
  | ![example](/docs/cfg.png) Tela da lista com suas tarefas, filtros, busca, configurações da tarefa e da lista (bottom-tab no footer)| ![example](/docs/task-check.png) Quando uma tarefa é concluída, ela aparece com os textos riscados e opacidade para se diferenciar| ![example](/docs/filter-check.png) Podemos também filtrar a lista das tarefas pelo seu estado: _DONE_ (Concluída) ou _TO DO_ (A Fazer)
  
  <hr />

  | Lista - Excluir lista  | Lista - Estado de tarefas | Lista - Filtro por estado     |
  |:----------:|:---------:|:--------:|
  | ![example](/docs/delete-list-warning.png) Ao tentar excluir uma lista, é exibido um aviso para lembrar o usuário que todas as tarefas serão excluídas também| ![example](/docs/edit-list.png) Podemos editar nome e descrição da lista ao clicar nas configurações (bottom-tab no footer) e clicar no ícone de lápis| ![example](/docs/edit-task.png) Podemos editar nome e descrição da tarefa ao clicar no ícone de configurações (⚙️ ) e clicar no ícone de lápis (✏️)

  <hr />

<section> -->
<br />
<br />

<a name="user-data" />
<h2 align="center"><b>Explicação dos dados do usuário</b></h2>
<p>Os dados que a aplicação utiliza são exclusivamente para persistência de informação, pois não faz sentido o usuário cadastrar novamente todas as listas com todas tarefas toda vez que abrir o aplicativo em seu celular. Portanto, é persistido no <code>localStorage</code> informações das listas e suas respectivas tarefas.</p>


<br />
<em><code>Estrutura dos dados:</code></em>
<br />
<br />
<div align="start">


```json 
{
  "lists": [
    {
      "id": "1",
      "name": "Lista 1",
      "description": "Descrição da lista 1",
      "tasks": [
        {
          "id": "1",
          "name": "Tarefa 1",
          "description": "Descrição da tarefa 1",
          "completed": false
        },
        {
          "id": "2",
          "name": "Tarefa 2",
          "description": "Descrição da tarefa 2",
          "completed": false
        }
      ]
    },
    {
      "id": "2",
      "name": "Lista 2",
      "description": "Descrição da lista 2",
      "tasks": [
        {
          "id": "3",
          "name": "Tarefa 3",
          "description": "Descrição da tarefa 3",
          "completed": false
        }
      ]
    }
  ]
}
```

</div>


<br />
<br />

<a name="questions" />
<h2 align="center"><b>Perguntas para a avaliação do App</b></h2>

<div align="start">

✅ A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente? <code><b>Sim</b></code>
  
✅ A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes? <code><b>Sim</b></code>
  
✅ A aplicação armazena e usa de forma relevante dados complexos do usuário? <code><b>Sim</b></code>
  

✅ A aplicação possui um manifesto para instalação no dispositivo do usuário? <code><b>Sim</b></code>
  
  <a href="/manifest.webmanifest" target="_blank">Link para o arquivo do manifesto</a>
  
✅ A aplicação possui um service worker que permite o funcionamento off-line? <code><b>Sim</b></code>

   <a href="/service-worker.js" target="_blank">Link para o arquivo do service-worker</a>
  
🚫 O código da minha aplicação possui comentários explicando cada operação? <code><b>Não</b></code>
  
  <code>Não vejo a necessidade de comentários explicando o código, pois basta o código ser limpo, bem organizado, e claro, objetivo. Acredito ter utilizado padrões comuns de nomenclatura, separação por responsabilidades, arquitetura de arquivos organizada, variáveis de estilos, etc.</code>

✅  A aplicação está funcionando corretamente? <code><b>Sim</b></code>

  
  <img src="assets/logo-only.png" width="40px" /> <a href="https://tasker-pwa.bernardomafra.repl.co/" target="_blank">Você pode acessá-la clicando aqui</a>
    
  
✅  A aplicação está completa? <code><b>Sim</b></code>
  
</div>

</div>
