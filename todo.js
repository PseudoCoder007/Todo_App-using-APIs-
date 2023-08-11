let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
function addTaskTODom(task){//1.create 'li' 2.adding HTML to 'li' ,and 3.appending li to ul list.
    // 1.
    const li=document.createElement('li');
    // 2.
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.done?checked:''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.svg" class="delete data-id="${task.id}">
    `
    //3.
    tasksList.append(li);
}

function renderList () {// 1. empty the 'ul' list  2.loop over the tasks[] and,  3.call the addTaskTODom() for each task
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskTODom(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

// function markTaskAsComplete (taskId) {} Or
function toggleTask (taskId) {// get the task with taskid and toggle done flag
    const task=tasks.filter(function(task){
        task.id==taskId;
    })
    if(task.length>0){
        const currentTask=task[0];
        currentTask.done=!currentTask.done;
        renderList();
        showNotification('Task is toggled successfully!');
        return;
    }
    showNotification('Could not toggled the task!');
}

function deleteTask (taskId) {
    const newTasks=tasks.filter(function(task){
       return task.id!==taskId;
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
        text,
        id:Date.now().toString(),
        done:false
    }
    e.target.value='';
    addTask(task);
}
}

addTaskInput.addEventListener('keyup',handleInputKeypress);