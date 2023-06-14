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

// edit eventlistener
todoList.addEventListener('keydown', (event) => {
  if (event.target.classList.contains('edit-input') && event.keyCode === 13) {
    const listItem = event.target.parentNode.parentNode;
    const index = parseInt(listItem.dataset.index, 10);
    const newDescription = event.target.value.trim();
    if (newDescription !== '') {
      editTaskDescription(index, newDescription);
    }
  }
});

// Call the renderTodoList function to initialize the list
renderTodoList();
