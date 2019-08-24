const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('#collection');
const btnCleare = document.querySelector('#btn-cleare');
const taskFilter = document.querySelector('#filter');

loadEventListener();

function loadEventListener(){

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    btnCleare.addEventListener('click', deleteTasks);

    taskFilter.addEventListener('keyup', filterTasks);


}
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task))

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML='&#10006;';

        li.appendChild(link);

        taskList.appendChild(li);
        taskInput.value = '';

    })
}

function addTask(e){
   
    if(taskInput.value === ''){
        alert('please add task');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value))

    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML='&#10006;';

    li.appendChild(link);

    taskList.appendChild(li);

    storeInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }

}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);   
    }
    cleareTasksFromLocalStorage();
}

function cleareTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        console.log(item);
        
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'flex';
        }else{
            task.style.display = 'none';
        }
    })
}