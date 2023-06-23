import { TextEncoder, TextDecoder } from 'util';
import {
  setTasks,
  getTasks,
  tasksCopy as tasks,
} from '../modules/todoList.js';
import { clearCompleted, updateStatus } from '../modules/statusUpdates.js';

Object.assign(global, { TextDecoder, TextEncoder });
const { JSDOM } = require('jsdom');

// mock document
const { window } = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <main>
        <div id="divToDoList" class="bg-white">
            <div class="list-title">
                <h2>Today's To Do</h2>
                <i class="fa-solid fa-rotate"></i>
            </div>
            <div class="list-input">
                <input type="text" placeholder="Add to your list...">
                <i class="fas fa-level-down-alt fa-rotate-90"></i>
            </div>

            <div id="todoList">
               <p>one</p>
            </div>

            <div class="list-footer">
                <button>Clear all completed</button>
            </div>
        </div>
    </main>
</body>
</html>`);

// set window globally;
global.document = window.document;

const todoList = document.createElement('ul');
todoList.id = 'todoList';
document.body.appendChild(todoList);

describe('updateStatus', () => {
  beforeEach(() => {
    // Mock the localStorage and clear any stored tasks
    localStorage.clear();
    // Mock the tasks data
    const mockTasks = [
      { index: 1, description: 'go to gym', completed: false },
      { index: 2, description: 'join meeting', completed: true },
      { index: 3, description: 'play video games', completed: false },
    ];
    setTasks(mockTasks);
  });

  it('update completed status of a task and update tasks list', () => {
    // Call the updateStatus function
    updateStatus(2, false);
    // Assert that the task completed status has been updated
    const updatedTasks = getTasks();
    expect(updatedTasks[1].completed).toBe(false);
    // Assert that the tasks have been saved to localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(savedTasks).toEqual(updatedTasks);
  });
});

describe('clear Completed', () => {
  beforeEach(() => {
    // Mock the localStorage and clear any stored tasks
    localStorage.clear();
    // Mock the tasks data
    const mockTasks = [
      { index: 1, description: 'go to gym', completed: false },
      { index: 1, description: 'buy dragon eggs', completed: false },
      { index: 2, description: 'join meeting', completed: true },
      { index: 3, description: 'play video games', completed: true },
      { index: 3, description: 'check new cars', completed: true },
      { index: 3, description: 'eat chicken legs', completed: false },
    ];
    setTasks(mockTasks);
  });

  it('should delete all completed tasks', () => {
    let amountOfCompletedTasks = 0;
    const initialLength = tasks.length;
    const todoList = document.querySelector('#todoList');

    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (element.completed) {
        amountOfCompletedTasks += 1;
      }
    }
    clearCompleted();

    // simulate printing tasks
    todoList.innerHTML = '';
    tasks.forEach((task) => {
      const taskElement = document.createElement('p');
      taskElement.innerHTML = `<p>${task.content}</p>`;
      todoList.appendChild(taskElement);
    });

    expect(initialLength - amountOfCompletedTasks).toBe(tasks.length);
    expect(todoList.children.length).toBe(tasks.length);
  });
});