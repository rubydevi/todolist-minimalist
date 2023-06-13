import _ from 'lodash';
import './style.css';

const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
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
}

window.addEventListener('DOMContentLoaded', renderTodoList);
