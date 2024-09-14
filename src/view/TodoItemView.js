import { element, htmlToElement } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodoCompleted, onUpdateTodoTitle, onDeleteTodo }) {
    const $todoItemElement = todoItem.completed ? element`<li><input type="checkbox" class=checkbox checked><s>${todoItem.title}</s><div><button class=edit-item-button>✍️</button><button class=delete>x</button></di></li>` : element`<li><input type="checkbox" class=checkbox>${todoItem.title}<div><button class=edit-item-button>️️✍️</button><button class=delete>x</button></div></li>`;

    const $todoCompletedElement = $todoItemElement.querySelector(".checkbox");
    $todoCompletedElement.addEventListener("click", () => {
      onUpdateTodoCompleted({
        id: todoItem.id,
        completed : !todoItem.completed
      });
    });

    const $editTodoButtonElement = $todoItemElement.querySelector(".edit-item-button");
    $editTodoButtonElement.addEventListener("click", (event) => {
      $todoItemElement.innerHTML = `<li><input type="text" id="update-todo" value="${todoItem.title}"><button id="update-todo-item">save</button></li>`;
      const $updateTodoButtonElement = $todoItemElement.querySelector("#update-todo-item");
      $updateTodoButtonElement.addEventListener("click", () => {
        const $updateTodoElement = $todoItemElement.querySelector("#update-todo");
        onUpdateTodoTitle({
          id: todoItem.id,
          title: $updateTodoElement .value
        });
      })
    })
    
    const $deleteTodoElement = $todoItemElement.querySelector(".delete");
    $deleteTodoElement.addEventListener("click", () => {
      const deleteConfirm = window.confirm("本当に削除してもよろしいですか?");
      if (!deleteConfirm) {
        return
      }

      onDeleteTodo({
        id: todoItem.id,
      });
    });

    return $todoItemElement;
  }
}