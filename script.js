var todoList = {
  todos: [],

  addTodos: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    var count = 0;
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed === true) {
        count++;
      }
    }
    if (count === this.todos.length) {
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === false) {
          this.todos[i].completed = true;
        }
      }
    }
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  }
};



var handlers = {

  addTodo: function () {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoTextInput.value = '';
    changeTodoPositionInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition = '';
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todo.completed === false) {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },

  createDeleteButton() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuń';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setEventListeners: function () {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function (event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  }
};

view.setEventListeners();