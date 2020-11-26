//Remember to refactor..

//Selectors
let todoInput = document.querySelector('#todo-input');
let todoBtn = document.querySelector('#todo-btn');
let list = document.querySelector('#todo-list');
let filter = document.querySelector('.filter');
const fileName = 'todoSave';

//Event Listeners
todoBtn.addEventListener('click', addItem);
list.addEventListener('click', removeItem);
list.addEventListener('click', completeItem);
filter.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', updateUI);

//Functions
function addItem(event) {
  event.preventDefault();
  if (todoInput.value.trim() !== '') {
    generateElement(todoInput.value);
    //Add to local storage
    saveToDo(todoInput.value);
    todoInput.value = '';
  } else {
    //add an alert element
  }
}

function removeItem(event) {
  let item = event.target;
  if (item.classList.contains('delete-btn')) {
    item.parentElement.classList.add('slide');
    item.parentElement.addEventListener('transitionend', function () {
      item.parentElement.remove();
    });
    let save = fetchSave();
    localStorage.setItem(
      fileName,
      JSON.stringify(
        save.filter((e) => {
          return e !== item.parentElement.innerText;
        })
      )
    );
  }
}

function fetchSave() {
  return localStorage.getItem(fileName) === null
    ? []
    : JSON.parse(localStorage.getItem(fileName));
}

function completeItem(event) {
  let item = event.target;
  if (item.classList.contains('complete-btn')) {
    item.parentElement.classList.add('completed');
  }
}

function filterTodo() {
  let items = list.childNodes;
  switch (filter.value) {
    case 'all':
      items.forEach((e) => {
        e.style.display = 'flex';
      });
      break;
    case 'completed':
      items.forEach((e) => {
        if (e.classList.contains('completed')) {
          e.style.display = 'flex';
        } else {
          e.style.display = 'none';
        }
      });
      break;
    case 'uncompleted':
      items.forEach((e) => {
        if (!e.classList.contains('completed')) {
          e.style.display = 'flex';
        } else {
          e.style.display = 'none';
        }
      });
      break;
  }
}

//modify to accept an object
function saveToDo(todo) {
  let save = fetchSave();
  save.push(todo);
  localStorage.setItem(fileName, JSON.stringify(save));
}

function generateElement(text) {
  let div = document.createElement('div');
  div.classList.add('todo');

  let li = document.createElement('li');
  li.innerText = text;
  li.classList.add('todo-item');

  let checkBtn = document.createElement('button');
  checkBtn.innerHTML = '<i class="fas fa-check ignore"></i>';
  checkBtn.classList.add('complete-btn');

  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash ignore"></i>';
  deleteBtn.classList.add('delete-btn');

  div.appendChild(li);
  div.appendChild(checkBtn);
  div.appendChild(deleteBtn);
  list.appendChild(div);
}

function updateUI() {
  let save = fetchSave();
  save.forEach((todo) => {
    generateElement(todo);
  });
}
