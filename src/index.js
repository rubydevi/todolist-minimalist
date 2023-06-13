import './style.css';

const tasks = [
  { description: 'Go to the gym', completed: false, index: 1 },
  { description: 'Download youtube videos', completed: true, index: 2 },
  { description: 'Call Monica back', completed: false, index: 3 },
];

const renderTodoList = () => {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.description;
    listItem.classList.add(task.completed ? 'completed' : 'incomplete');
    todoList.appendChild(listItem);
  });
};

window.addEventListener('DOMContentLoaded', renderTodoList);
