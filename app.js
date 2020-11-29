const DOM = (() => {
  const todoList = document.querySelector('.todo-list');

  createTodo = (todoText, id, completed) => {
    const todo = document.createElement('li');
    todo.classList = completed ? 'todo-item completed' : 'todo-item';
    todo.id = id;

    const text = document.createElement('p');
    text.classList = 'todo-text';
    text.innerHTML = todoText;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'btn todo-delete';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.addEventListener('click', () => {
      todos.deleteTodo(id);
    });

    const completeBtn = document.createElement('button');
    completeBtn.classList = 'btn todo-complete';
    completeBtn.innerHTML = 'Complete';
    if (completed) completeBtn.disabled = true;
    completeBtn.addEventListener('click', () => {
      todos.completeTodo(id);
    });

    todo.appendChild(text);
    todo.appendChild(deleteBtn);
    todo.appendChild(completeBtn);

    return todo;
  };

  clearTodos = () => {
    [...todoList.children].forEach((todo) => todo.remove());
  };

  renderTodos = (todoData) => {
    clearTodos();
    todoData.forEach(({ todoText, completed }, id) => {
      todoList.appendChild(createTodo(todoText, id, completed));
    });
  };

  return {
    createTodo,
    renderTodos,
  };
})();

const todos = (() => {
  const todoData = [];

  addTodo = (todoText) => {
    todoData.push({ todoText, completed: false });
    DOM.renderTodos(todoData);
  };

  deleteTodo = (id) => {
    todoData.splice(id, 1);
    DOM.renderTodos(todoData);
  };

  completeTodo = (id) => {
    todoData[id].completed = true;
    DOM.renderTodos(todoData);
  };

  return {
    addTodo,
    deleteTodo,
    completeTodo,
  };
})();

const controller = (() => {
  const addBtn = document.querySelector('.todo-add');
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoInput = document.querySelector('.todo-input');
    todos.addTodo(todoInput.value);
    todoInput.value = '';
  });
})();
