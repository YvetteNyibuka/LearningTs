"use strict";
let tasks = [];
function loadTasks() {
    const tasksString = localStorage.getItem("tasks");
    if (tasksString) {
        tasks = JSON.parse(tasksString);
        displayTasks();
    }
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskContent = taskInput.value.trim();
    if (taskContent === "") {
        return;
    }
    const newTask = {
        id: new Date().getTime(),
        content: taskContent,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskInput.value = "";
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}
function toggleTask(id) {
    let taskFound = false;
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
            taskFound = true;
        }
    });
    if (taskFound) {
        saveTasks();
        displayTasks();
    }
}
function updateTask(id, newContent) {
    let taskFound = false;
    tasks.forEach(task => {
        if (task.id === id) {
            task.content = newContent;
            taskFound = true;
        }
    });
    if (taskFound) {
        saveTasks();
        displayTasks();
    }
}
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.content;
        li.className = task.completed ? 'completed' : '';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        const toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
        toggleButton.addEventListener('click', () => toggleTask(task.id));
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const updatedContent = prompt('Enter new task content:', task.content);
            if (updatedContent !== null) {
                updateTask(task.id, updatedContent.trim());
            }
        });
        li.appendChild(toggleButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
loadTasks();
