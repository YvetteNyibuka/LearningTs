var tasks = [];
function loadTasks() {
    var tasksString = localStorage.getItem("tasks");
    if (tasksString) {
        tasks = JSON.parse(tasksString);
        displayTasks();
    }
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskContent = taskInput.value.trim();
    if (taskContent === "") {
        return;
    }
    var newTask = {
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
    tasks = tasks.filter(function (task) { return task.id !== id; });
    saveTasks();
    displayTasks();
}
function toggleTask(id) {
    var taskFound = false;
    tasks.forEach(function (task) {
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
    var taskFound = false;
    tasks.forEach(function (task) {
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
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.textContent = task.content;
        li.className = task.completed ? 'completed' : '';
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () { return deleteTask(task.id); });
        var toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
        toggleButton.addEventListener('click', function () { return toggleTask(task.id); });
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            var updatedContent = prompt('Enter new task content:', task.content);
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
