module.exports = class Database {
  constructor(todos) {
    this.data = todos;
  }

  findAll() {
    return this.data;
  }

  findById(id) {
    return this.data.find((todo) => todo.id === id);
  }

  update(id, text) {
    return this.data = this.data.map((item) => {
      if (item.id === id) {
        return { ...item, title: text };
      }
      return item;
    });
  }

  create(payload) {
    this.data.push(payload);
    return payload;
  }

  delete(id) {
    return (this.data = this.data.filter((todo) => todo.id !== id));
  }
};
