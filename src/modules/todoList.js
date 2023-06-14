let tasks = [];

export const renderTodoList = () => {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; // Clear the existing list

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', task.index);

    // create checkbox
    const listCheck = document.createElement('input');
    listCheck.setAttribute('type', 'checkbox');
    listCheck.checked = task.completed;

    // creat edit input
    const listDescription = document.createElement('input');
    listDescription.setAttribute('type', 'text');
    listDescription.classList.add('edit-input');
    listDescription.value = task.description;

    // create label
    const label = document.createElement('label');
    label.appendChild(listCheck);
    // label.append(task.description);
    label.append(listDescription);

    const dragRow = document.createElement('button');
    dragRow.className = 'drag-row'; // Add the 'drag-row' class
    dragRow.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button'; // Add the 'delete-button' class
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.style.display = 'none';

    listItem.appendChild(label);
    listItem.appendChild(dragRow);
    listItem.appendChild(deleteButton);
    listItem.classList.add(task.completed ? 'completed' : 'incomplete');
    todoList.appendChild(listItem);

    listItem.addEventListener('click', (event) => {
      const clickedListItem = event.currentTarget;

      // Set background color of clicked list item
      clickedListItem.style.backgroundColor = '#fffeca';

      // Remove background color when mouse is clicked somewhere else
      const outsideClickListener = (event) => {
        if (!clickedListItem.contains(event.target)) {
          clickedListItem.style.backgroundColor = '';
          document.removeEventListener('click', outsideClickListener);
        }
      };

      // Register the outsideClickListener
      document.addEventListener('click', outsideClickListener);

      // Get all the existing delete buttons and drag buttons
      const deleteButtons = document.querySelectorAll('.delete-button');
      const dragRows = document.querySelectorAll('.drag-row');

      // Hide all the existing delete buttons and show all the drag buttons
      deleteButtons.forEach((button) => {
        button.style.display = 'none';
      });
      dragRows.forEach((row) => {
        row.style.display = 'inline-block';
      });

      // Show the delete button for the clicked row and hide its drag button
      deleteButton.style.display = 'inline-block';
      dragRow.style.display = 'none';

      deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the event from bubbling up to the list item
        const index = parseInt(listItem.dataset.index, 10);
        deleteTask(index);
        clickedListItem.remove();
      });
    });
  });
};

export const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  renderTodoList();
};

const deleteTask = (index) => {
  tasks = tasks.filter((task) => task.index !== index);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  renderTodoList();
};

export const editTaskDescription = (index, newDescription) => {
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.description = newDescription;
    renderTodoList();
  }
};

export const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTodoList();
  }
};
