//Remember to refactor..

//Selectors
let todoInput = document.querySelector('#todo-input');
let todoBtn = document.querySelector('#todo-btn');
let list = document.querySelector('#todo-list');
let filter = document.querySelector('.filter');

//Event Listeners
todoBtn.addEventListener('click',addItem);
list.addEventListener('click',removeItem);
list.addEventListener('click',completeItem);
filter.addEventListener('change',filterTodo);
document.addEventListener('DOMContentLoaded',updateUI);

//Functions
function addItem(event){
    event.preventDefault();

    let div = document.createElement('div');
    div.classList.add('todo');

    let li = document.createElement('li');
    li.innerText = todoInput.value;
    li.classList.add('todo-item');

    //Add to local storage
    saveToDo(todoInput.value);

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
    todoInput.value = '';
}

function removeItem(event){
    let item = event.target;
    if(item.classList.contains('delete-btn')){
        item.parentElement.classList.add('slide');
        item.parentElement.addEventListener('transitionend',
        function(){
            item.parentElement.remove();
        })
        let save;
        if(localStorage.getItem('todoSave') === null){
            save = [];
        }else{
            save = JSON.parse(localStorage.getItem('todoSave'));
        }
        localStorage.setItem('todoSave',JSON.stringify(
            save.filter(e=>{
                return e !== item.parentElement.innerText;
            })
        ));
    }
}

function completeItem(event){
    let item = event.target;
    if(item.classList.contains('complete-btn')){
        item.parentElement.classList.add('completed');
    }
}

function filterTodo(){
    let items = list.childNodes;
    console.log(items);
    switch(filter.value){
        case 'all':
            items.forEach(e=>{
                e.style.display = 'flex';
            });
            break;
        case 'completed':
            items.forEach(e=>{
                if(e.classList.contains('completed')){
                    e.style.display = 'flex';
                }else{
                    e.style.display = 'none';
                }
            })
            break;
        case 'uncompleted':
            items.forEach(e=>{
                if(!e.classList.contains('completed')){
                    e.style.display = 'flex';
                }else{
                    e.style.display = 'none';
                }
            })
            break;
    }
}

function saveToDo(todo){
    let save;
    if(localStorage.getItem('todoSave') === null){
        save = [];
    }else{
        save = JSON.parse(localStorage.getItem('todoSave'));
    }
    save.push(todo);
    localStorage.setItem('todoSave',JSON.stringify(save));
}

function updateUI(){
    let save;
    if(localStorage.getItem('todoSave') === null){
        save = [];
    }else{
        save = JSON.parse(localStorage.getItem('todoSave'));
    }
    save.forEach((todo)=>{
        let div = document.createElement('div');
        div.classList.add('todo');

        let li = document.createElement('li');
        li.innerText = todo;
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
    })
}