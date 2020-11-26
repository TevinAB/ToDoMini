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
document.addEventListener('DOMContentLoaded', initUI);

//Functions
function addItem(event) {
  event.preventDefault();
  if (todoInput.value.trim() !== '' && !isDuplicate(todoInput.value)) {
    let obj = {text: todoInput.value.trim(),completed: false};
    generateElement(obj);
    //Add to local storage
    saveToDo(obj);
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
          return e.text !== item.parentElement.innerText;
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

function isDuplicate(text){
    let target = text.toLowerCase().trim();
    let arr = fetchSave();
    for(let i = 0; i < arr.length; i++){
        if(arr[i]['text'].toLowerCase() === target)
            return true;
    }
    return false;
}

function completeItem(event) {
  let item = event.target;
  if (item.classList.contains('complete-btn')) {
    item.parentElement.classList.add('completed');
    //update a state on that element
    let sibText = item.previousSibling.innerText;
    let save = fetchSave();
    save.forEach(e=>{
        if(e.text === sibText){
            e.completed = true;
        }
    });
    localStorage.setItem(fileName, JSON.stringify(save));
    //update the ui to reflect that
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

function saveToDo(obj) {
  let save = fetchSave();
  save.push(obj);
  localStorage.setItem(fileName, JSON.stringify(save));
}

function generateElement(obj) {
  let div = document.createElement('div');
  div.classList.add('todo');

  let li = document.createElement('li');
  li.innerText = obj.text;
  li.classList.add('todo-item');
  if(obj.completed){
      div.classList.add('completed');
  }

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

function initUI() {
  let save = fetchSave();
  save.forEach((e) => {
    generateElement(e);
  });
}

function updateUI(){
    //
}
