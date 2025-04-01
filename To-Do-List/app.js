let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const trackingTaskList = document.getElementById('trackingTaskList');
const addTaskForm = document.getElementById('addTaskForm');
const contactForm = document.getElementById('contactForm');
const body = document.body;

// Function to toggle between dark and light themes
function toggleTheme() {
    body.classList.toggle('dark-theme');
    const themeIcon = document.getElementById('themeToggleIcon');
    if (body.classList.contains('dark-theme')) {
        themeIcon.src = 'path/to/light-icon.png'; // Path to light theme icon
    } else {
        themeIcon.src = 'path/to/dark-icon.png'; // Path to dark theme icon
    }
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        if (task.priority === 'high') {
            taskElement.classList.add('high-priority');
        } else if (task.priority === 'medium') {
            taskElement.classList.add('medium-priority');
        } else {
            taskElement.classList.add('low-priority');
        }
        taskElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5>${task.name}</h5>
                    <p>${task.description}</p>
                    <p>Due Date: ${task.dueDate}</p>
                    <p>Priority: ${task.priority}</p>
                    <p>Category: ${task.category}</p>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                    <button class="btn btn-sm btn-success" onclick="completeTask(${index})"><i class="fa fa-check" aria-hidden="true"></i> Complete</button>
                    <button class="btn btn-sm btn-primary" onclick="editTask(${index})"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                </div>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function renderCompletedTaskList() {
    completedTaskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (task.completed) {
            const taskElement = document.createElement('li');
            taskElement.classList.add('task');
            taskElement.classList.add('completed');
            taskElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5>${task.name}</h5>
                        <p>${task.description}</p>
                        <p>Due Date: ${task.dueDate}</p>
                        <p>Priority: ${task.priority}</p>
                        <p>Category: ${task.category}</p>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                    </div>
                </div>
            `;
            completedTaskList.appendChild(taskElement);
        }
    });
}

function addTask(taskName, taskDescription, dueDate, priority, category) {
    const task = { name: taskName, description: taskDescription, dueDate, priority, category, completed: false };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
    renderTrackingTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
    renderCompletedTaskList();
}

function completeTask(index) {
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
    renderCompletedTaskList();
    renderTrackingTaskList();
}

function editTask(index) {
    const task = tasks[index];
    const editTaskModal = document.getElementById('editTaskModal');
    const editTaskForm = document.getElementById('editTaskForm');
    editTaskForm.name.value = task.name;
    editTaskForm.description.value = task.description;
    editTaskForm.dueDate.value = task.dueDate;
    editTaskForm.priority.value = task.priority;
    editTaskForm.category.value = task.category;
    editTaskModal.style.display = 'block';
    editTaskForm.onsubmit = (e) => {
        e.preventDefault();
        task.name = editTaskForm.name.value;
        task.description = editTaskForm.description.value;
        task.dueDate = editTaskForm.dueDate.value;
        task.priority = editTaskForm.priority.value;
        task.category = editTaskForm.category.value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskList();
        renderCompletedTaskList();
        renderTrackingTaskList();
    };
}

addTaskForm.onsubmit = (e) => {
    addTaskForm.style.display = 'none'; // Hide the form after saving the task
    // e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;
    addTask(taskName, taskDescription, dueDate, priority, category);
    addTaskForm.reset();
};

contactForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log(name, email, message);
    contactForm.reset();
};

renderTaskList();
renderCompletedTaskList();
