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
    const listCheck = document.createElement('input');
    listCheck.setAttribute('type', 'checkbox');
    listCheck.checked = task.completed;

    const label = document.createElement('label');
    label.appendChild(listCheck);
    label.append(task.description);

    const dragRow = document.createElement('span');
    dragRow.innerHTML = 
    `
    <i class="fa-solid fa-ellipsis-vertical"></i>
    `;

    listItem.appendChild(label);
    listItem.appendChild(dragRow);
    listItem.classList.add(task.completed ? 'completed' : 'incomplete');
    todoList.appendChild(listItem);
  });
};

window.addEventListener('DOMContentLoaded', renderTodoList);
