const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  const filterValue = filter.value;

  let filteredTasks = tasks;

  if (filterValue === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filterValue === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((task, index) => {
      const li = document.createElement('li');
      li.className = `task ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span class="text">${task.text}</span>
        <div class="actions">
          <button onclick="toggleTask(${index})">✔️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    });
}

function addTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({
    text,
    completed: false,
    createdAt: Date.now()
  });

  saveTasks();
  renderTasks();
  taskInput.value = '';
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', addTask);
filter.addEventListener('change', renderTasks);

// Initial render
renderTasks();
