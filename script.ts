interface Task {
    id: number;
    content: string;
    completed: boolean;
}

let tasks: Task[] = [];

function loadTasks(): void {
    const tasksString = localStorage.getItem("tasks");
    if (tasksString) {
        tasks = JSON.parse(tasksString);
        displayTasks();
    }
}

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(): void {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const taskContent = taskInput.value.trim();
    if (taskContent === "") {
        return;
    }

    const newTask: Task = {
        id: new Date().getTime(),
        content: taskContent,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskInput.value = "";
}

function deleteTask(id: number): void {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

function toggleTask(id: number): void {
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

function updateTask(id: number, newContent: string): void {
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

function displayTasks(): void {
    const taskList = document.getElementById('taskList') as HTMLUListElement;
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
