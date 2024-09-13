import { TodoItemView } from "./TodoItemView.js";
import { element } from "./html-util.js";

export class TodoListView {
  constructor() {
    this.todoItemView = new TodoItemView;
  }

  createElement(todoItems, { onUpdateTodoCompleted, onUpdateTodoTitle, onDeleteTodo }) {
    const $todoListElement = element`<ul></ul>`;

    todoItems.forEach((todoItem) => {
      const $todoItemElement = this.todoItemView.createElement(todoItem, { onUpdateTodoCompleted, onUpdateTodoTitle, onDeleteTodo })
      $todoListElement.appendChild($todoItemElement);
    });

    return $todoListElement;
  }
}