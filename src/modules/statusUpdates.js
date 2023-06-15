import { renderTodoList, saveTasksToLocalStorage, tasks } from './todoList.js';

export const updateStatus = (index, completed) => {
  const updatedTasks = tasks.map((task) => {
    if (task.index === index) {
      return { ...task, completed };
    }
    return task;
  });

  // Update tasks array and save to local storage
  tasks.splice(0, tasks.length, ...updatedTasks);
  saveTasksToLocalStorage();
  renderTodoList();
};

export const clearCompleted = () => {
  const filteredTasks = tasks.filter((task) => !task.completed);

  const updatedTasks = filteredTasks.map((task, index) => ({
    ...task,
    index: index + 1,
  }));

  // Update tasks array and save to local storage
  tasks.splice(0, tasks.length, ...updatedTasks);
  saveTasksToLocalStorage();
  renderTodoList();
};
