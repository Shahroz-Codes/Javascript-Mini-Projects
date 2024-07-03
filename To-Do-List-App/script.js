//Getting Elements From Html

const newtask = document.querySelector('.CreateTaskbtn');
const Creation = document.querySelector('.CreationPane')
const tasks = document.querySelector('.tasks')
const taskli = document.querySelector('listofTasks')

//Created Elements

let inputTask = document.createElement('input');
inputTask.setAttribute('type', 'text');
inputTask.setAttribute('placeholder', 'Write Your Task here');

let duedate = document.createElement('input')
duedate.setAttribute('type', 'date')

let div = document.createElement('div')

let button = document.createElement('button')

let p1 = document.createElement('p')
let li = document.createElement('li')

//Created Variables
let currenttask;
let currentdate;

//Create a new task Button Actions
newtask.addEventListener('click', function (e) {
    CreateTask();
    
});

button.addEventListener('click', (e) => {

        // currenttask = inputTask.value;
        // currentdate = duedate;
        AddtoTasksList();
        inputTask.value = "";
        duedate.value= "";
        Creation.removeChild(inputTask);
        Creation.removeChild(div);
        Creation.removeChild(button);

        
    })
//Delete a task Actions button



//All Functions 

function CreateTask() {
    Creation.appendChild(inputTask);
    Creation.appendChild(div);

    p1.innerHTML = `Enter Due Date : `
    div.appendChild(p1);
    div.appendChild(duedate);

    button.innerHTML = `Done`;
    Creation.appendChild(button)
}

function AddtoTasksList() {
    
}

function DeleteTask() {
    //
}