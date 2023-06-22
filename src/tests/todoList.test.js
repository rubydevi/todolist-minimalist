import localStorageMock from '../modules/__mocks__/localStorageMock.js';
import {
  addTask, deleteTask, setTasks, getTasks, editTaskDescription
} from '../modules/todoList.js';

const todoList = document.createElement('ul');
todoList.id = 'todoList';
document.body.appendChild(todoList);

describe('addTask', () => {
  it('should add a new task to the list', () => {
    const localStorage = localStorageMock;
    const task = {
      description: 'Buy groceries',
      completed: false,
    };

    addTask(localStorage, task);

    expect(todoList.children.length).toBe(1);
  });
});

describe('deleteTask', () => {
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
  it('should delete a task and update the tasks list', () => {
    // Call the deleteTask function
    deleteTask(2);
    // Assert that the task has been deleted
    const updatedTasks = getTasks();
    expect(updatedTasks.length).toBe(2);
    expect(updatedTasks[0].index).toBe(1);
    expect(updatedTasks[1].index).toBe(2);
    // Assert that the tasks have been saved to localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(savedTasks).toEqual(updatedTasks);
  });
});

describe('editTaskDescription', () => {
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

  it('edit the description of a task and update the tasks list', () => {
    // Call the editTaskDescription function
    editTaskDescription(2, 'updated description');
    // Assert that the task description has been updated
    const updatedTasks = getTasks();
    expect(updatedTasks[1].description).toBe('updated description');
    // Assert that the tasks have been saved to localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(savedTasks).toEqual(updatedTasks);
  });
});
