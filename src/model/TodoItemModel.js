let id = 0;
export class TodoItemModel {

  constructor({ title, completed }) {
    this.id = ++id;
    this.title = title;
    this.completed = completed;
  }
}