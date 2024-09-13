import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  #items;

  constructor(items = []) {
    super()
    this.#items = items;
  }

  getTodoItems() {
    return this.#items;
  }

  getCompletedItems() {
    return this.#items.filter((item) => item.completed === true);
  }

  getInCompletedItems() {
    return this.#items.filter((item) => item.completed === false);
  }

  onChange(listener){
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  updateTitle({ id, title }) {
    const todoItem = this.#items.find((item) => item.id === id);
    if (!todoItem) {
      return;
    }

    todoItem.title = title;
    this.emitChange();
  }

  updateCompleted({ id, completed }) {
    const todoItem = this.#items.find((item) => item.id === id);
    if (!todoItem) {
      return;
    }

    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo({ id }) {
    this.#items = this.#items.filter((item) => item.id !== id );
    this.emitChange();
  } 
} 