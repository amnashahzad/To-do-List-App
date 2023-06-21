// Get necessary elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<span>${taskText}</span><button onclick="editTask(this)">Edit</button><button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

// Function to edit a task
function editTask(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    const taskText = span.textContent;

    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        span.textContent = newTaskText.trim();
    }
}

// Function to delete a task
function deleteTask(button) {
    const li = button.parentNode;
    const taskText = li.querySelector('span').textContent;

    if (confirm(`Are you sure you want to delete "${taskText}"?`)) {
        li.remove();
    }
}

// Save tasks in local storage before reloading the page
window.addEventListener('beforeunload', () => {
    const tasks = [];
    const taskElements = document.querySelectorAll('#taskList li span');

    taskElements.forEach((taskElement) => {
        tasks.push(taskElement.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Load saved tasks from local storage
window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        tasks.forEach((taskText) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${taskText}</span><button onclick="editTask(this)">Edit</button><button onclick="deleteTask(this)">Delete</button>`;
            taskList.appendChild(li);
        });
    }
});
