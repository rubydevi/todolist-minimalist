import {
  setTasks,
  getTasks,
} from '../modules/todoList.js';
import { clearCompleted } from '../modules/statusUpdates.js';
import { updateStatus } from '../modules/statusUpdates.js';
import { tasks } from '../modules/todoList.js';


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

describe("clear Completed", () => {
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
    ];
    setTasks(mockTasks);
  });

  it("should delete all completed tasks", () => {
    let amountOfCompletedTasks = 0;
    const initialLength = tasks.length;

    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      element.completed && amountOfCompletedTasks++;
    }
    clearCompleted();
    expect(initialLength - amountOfCompletedTasks).toBe(tasks.length);
  })
});