let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(list = tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  list.forEach((task, index) => {
    taskList.innerHTML += `
      <li>
        <span class="task-text ${task.done ? 'done' : ''}" 
          onclick="toggleDone(${index})">${task.text}</span>
        <div>
          <button class="btn-edit" onclick="editTask(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
        </div>
      </li>`;
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') return alert('Please enter a task!');
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  input.value = '';
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function searchTasks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = tasks.filter(task => task.text.toLowerCase().includes(query));
  renderTasks(filtered);
}

renderTasks();
