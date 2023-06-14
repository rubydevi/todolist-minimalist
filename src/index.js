import './style.css';
import {
  renderTodoList, addTask, editTaskDescription, loadTasksFromLocalStorage, saveTasksToLocalStorage,
} from './modules/todoList.js';

window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
window.addEventListener('beforeunload', saveTasksToLocalStorage);

const todoInput = document.querySelector('.list-input input');
const todoList = document.getElementById('todoList');

// add tasks EventListener
todoInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const description = todoInput.value.trim();
    if (description !== '') {
      addTask(description);
      todoInput.value = ''; // Clear the input field
    }
  }
});
