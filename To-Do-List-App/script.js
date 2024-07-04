//Getting Elements From Html

const newtask = document.querySelector('.CreateTaskbtn');
const Creation = document.querySelector('.CreationPane')
const tasks = document.querySelector('.tasks')
const taskli = document.querySelector('.listofTasks')

//Created Elements

let inputTask = document.createElement('input');
inputTask.setAttribute('type', 'text');
inputTask.setAttribute('placeholder', 'Write Your Task here');

let duedate = document.createElement('input')
duedate.setAttribute('type', 'date')

let div = document.createElement('div')

let button = document.createElement('button')

let p1 = document.createElement('p')

//Created Variables
let currenttask;
let currentdate;

//Create a new task Button Actions

newtask.addEventListener('click', function (e) {
    CreateTask();

});

button.addEventListener('click', (e) => {
    if (CheckInput() == -1) {
        return;
    }
    AddtoTasksList();
    EmptyTaskPane();
})

//Deleting a task in task list

taskli.addEventListener('click', function (event) {
    if (event.target.className === 'DeleteButton') {
        const taskListItem = event.target.parentNode;
        taskListItem.parentNode.remove();
    }
});


//All Functions 

function CreateTask() {
    Creation.appendChild(inputTask);
    Creation.appendChild(div);

    p1.innerHTML = `Enter Due Date : `
    div.appendChild(p1);
    div.appendChild(duedate);

    button.innerHTML = `Done`;
    Creation.appendChild(button);
}

function AddtoTasksList() {
    let li = document.createElement('li')
    li.innerHTML = `<div class = "liitem"><input type="checkbox" class = "taskcheck" ><label>  Task :"${inputTask.value} " ; Due Date : ${duedate.value} </label><button class = "DeleteButton">Delete</button></div>`;
    taskli.appendChild(li);
}

function EmptyTaskPane() {
    inputTask.value = "";
    duedate.value = "";
    Creation.removeChild(inputTask);
    Creation.removeChild(div);
    Creation.removeChild(button);
}

function CheckInput() {
    console.log(inputTask.value, ` date :`, duedate.value)
    if (inputTask.value == "") {
        alert('Enter a Valid Task');
        return -1;
    }
    if (duedate.value == "") {
        alert('Enter a Valid Date');
        return -1;
    }
    let nowdate = new Date();
    let formattedDate = nowdate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    if (duedate.value <= formattedDate) {
        alert('Enter a Valid Date');
        return -1;
    }
}