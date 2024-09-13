import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js";

export class App {
  constructor() {
    this.todoListModel = new TodoListModel;
    this.todoListView  = new TodoListView;
  }

  handleUpdateCompleted({ id, completed }) {
    this.todoListModel.updateCompleted({
      id: id,
      completed: completed
    })
  }

  handleUpdateTitle({ id, title }) {
    this.todoListModel.updateTitle({
      id: id,
      title: title 
    })
  }

  handleDeleteTodo({ id }) {
    this.todoListModel.deleteTodo({
      id: id,
    })
  }

  handleAddTodo(todoItemModel) {
    this.todoListModel.addTodo(todoItemModel);
  }
  mount() {
    const $containerElement   = document.getElementById("js-todo-list");
    const $todoButtonElement = document.getElementById("add-todo-button");
    const $totalItemCountElement  = document.getElementById("total-item-count");
    const $completedItemCountElement  = document.getElementById("completed-item-count");
    const $incompleteItemCountElement  = document.getElementById("incomplete-item-count");

    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const $todoListElement = this.todoListView.createElement(todoItems, {
        onUpdateTodoCompleted: ({ id, completed }) => {
          this.handleUpdateCompleted({
            id: id,
            completed: completed
          })
        },
        onUpdateTodoTitle: ({ id, title }) => {
          this.handleUpdateTitle({
            id: id,
            title:title 
          })
        },
        onDeleteTodo: ({ id }) => {
          this.handleDeleteTodo({
            id: id
          });
        }
      });

      const totalItems = this.todoListModel.getTodoItems();
      const completedItems = this.todoListModel.getCompletedItems();
      const incompleteItems = this.todoListModel.getInCompletedItems();
      $totalItemCountElement.textContent = `total:${totalItems.length}`;
      $completedItemCountElement.textContent = `completed:${completedItems.length}`;
      $incompleteItemCountElement.textContent = `incomplete:${incompleteItems.length}`;

      render($todoListElement, $containerElement);
    });

    $todoButtonElement.addEventListener("click", () => {
      const inputTodo = document.getElementById("input-todo").value;
      if (!inputTodo) {
        return;
      }

      const todoItem = new TodoItemModel({
        title: inputTodo,
        completed: false
      });

      this.handleAddTodo(todoItem);

      const $inputTodoElement = document.getElementById("input-todo");
      $inputTodoElement.value = "";
      
    });
  }
}