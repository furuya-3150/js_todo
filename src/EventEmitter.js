export class EventEmitter {
  #listeners;
  constructor() {
    this.#listeners = new Map;
  }

  addEventListener(type, listener) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set);
    }

    const setListener = this.#listeners.get(type);
    setListener.add(listener);
  }

  emit(type) {
    const setListeners = this.#listeners.get(type);
    if (!setListeners) {
      return;
    }

    setListeners.forEach(listener => {
      return listener.call(this);
    });
  }
}