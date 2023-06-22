import { addTask, deleteTask } from '../modules/todoList';
import localStorageMock from '../modules/__mocks__/localStorageMock';

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

// describe('deleteTask', () => {
//   it('should remove a task from the list', () => {
//     const tasks = [
//       {
//         description: 'Buy groceries',
//         completed: false,
//         index: 1,
//       },
//       {
//         description: 'Do laundry',
//         completed: false,
//         index: 2,
//       },
//     ];

//     const taskToDelete = tasks[0];
//     const localStorage = localStorageMock;
//     deleteTask(localStorage, taskToDelete);

//     expect(localStorage.getItem('tasks')).toEqual(JSON.stringify([
//       {
//         description: 'Do laundry',
//         completed: false,
//         index: 1,
//       },
//     ]));
//   });
// });

// describe('deleteTask', () => {
//   it('should remove a task from the list', () => {
//     const tasks = [
//       {
//         description: 'Buy groceries',
//         completed: false,
//         index: 1,
//       },
//       {
//         description: 'Do laundry',
//         completed: false,
//         index: 2,
//       },
//     ];
  
//     const taskToDelete = tasks[0];
//     deleteTask(taskToDelete.index);
  
//     // Mock the renderTodoList function
//     jest.mock('./renderTodoList');
//     jest.spyOn('./renderTodoList').mockReturnValue({
//       element: document.createElement('ul'),
//     });
  
//     // Call the renderTodoList function
//     renderTodoList();
  
//     // Assert that the task has been removed from the list
//     expect(tasks).toEqual([
//       {
//         description: 'Do laundry',
//         completed: false,
//         index: 1,
//       },
//     ]);
//   });
// });
