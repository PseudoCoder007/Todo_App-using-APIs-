var todoListApp=(function(){let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
var a=10;
async function fetchTodos(){
    try{
        const response=await fetch('https://jsonplaceholder.typicode.com/todos');
        const data=await response.json();
        tasks=data.slice(0,10);
        renderList();
    } 
    catch(error){
        console.log(error);
    }
}


function addTaskTODom(task){//1.create 'li' 2.adding HTML to 'li' ,and 3.appending li to ul list.
    // 1.
    const li=document.createElement('li');
    // 2.
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.completed? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}">
    `
    //3.
    tasksList.append(li);
}

function renderList () {//  1. empty the 'ul' list  2.loop over the tasks[] and,  3.call the addTaskTODom() for each task
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskTODom(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

// function markTaskAsComplete (taskId) {} Or
function toggleTask (taskId) {// get the task with taskid and toggle completed flag
    const task=tasks.filter(function(task){
        return task.id==taskId;
    })
    if(task.length>0){
        const currentTask=task[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        showNotification('Task is toggled successfully!');
        return;
    }
    showNotification('Could not toggled the task!');
}

function deleteTask (taskId) {
    const newTasks=tasks.filter(function(task){
       return task.id!==Number(taskId);
    })
    tasks=newTasks;
    renderList();
    showNotification('Task is deleted successfully!');
}

function addTask (task) {//add task in task[] and call renderList()
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task is added successfully!');
        return;
    }
    showNotification('Task is not added successfully!');
}

function showNotification(text) {
    alert(text);
}

//to grab the input task we need to attach an EventListner to the i/p box and when user press enter 
function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
    //for checking the function  is working ok-:
    console.log('text',text);
    if(!text){
        showNotification('Task text cannot be empty!');
    }
    const task={
        title:text,
        id:Date.now().toString(),
        completed:false
    }
    e.target.value='';
    addTask(task);
}
}
function handleClickListener(e){
    const target=e.target;
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;        
    }

}

function initializeApp(){
fetchTodos();
addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleClickListener);
}

return{
    initialize:initializeApp,
    a:a
}
})();