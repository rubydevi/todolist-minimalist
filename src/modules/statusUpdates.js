import {
  renderTodoList, saveTasksToLocalStorage, getTasks, setTasks,
} from './todoList.js';

export const updateStatus = (index, completed) => {
  const tasks = getTasks(); // Get tasks using the getter

  const updatedTasks = tasks.map((task) => {
    if (task.index === index) {
      return { ...task, completed };
    }
    return task;
  });

  // Update tasks array and save to local storage using the setter
  setTasks(updatedTasks);
  saveTasksToLocalStorage();
  renderTodoList();
};

export const clearCompleted = () => {
  const tasks = getTasks(); // Get tasks using the getter

  const filteredTasks = tasks.filter((task) => !task.completed);

  const updatedTasks = filteredTasks.map((task, index) => ({
    ...task,
    index: index + 1,
  }));

  // Update tasks array and save to local storage using the setter
  setTasks(updatedTasks);
  saveTasksToLocalStorage();
  renderTodoList();
};
