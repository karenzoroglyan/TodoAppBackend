const db = require("../db");

function getTodos(server) {
  server.route({
    method: "GET",
    path: "/todos",
    handler: async (request, h) => {
      const result = await db.query("SELECT * FROM todo");
      return result.rows;
    },
  });
}

function getTodosById(server) {
  server.route({
    method: "GET",
    path: "/todos/{todoId}",
    handler: async (request, h) => {
      const result = await db.query("SELECT * FROM todo where id = $1", [
        request.params.todoId,
      ]);
      return result.rows;
    },
  });
}

function updateTodoById(server) {
  server.route({
    method: "PUT",
    path: "/todos/{todoId}",
    handler: async (request, h) => {
      const todoId = request.params.todoId;
      const text = request.payload.text;

      const result = await db.query(
        "UPDATE todo set id = $1, title = $2 RETURNING *",
        [todoId, text]
      );

      return result.rows;
    },
  });
}

function deleteTodo(server) {
  server.route({
    method: "DELETE",
    path: "/todos/{todoId}",
    handler: async (request, h) => {
      const result = await db.query("DELETE FROM todo where id = $1", [
        request.params.todoId,
      ]);
      return result.rows;
    },
  });
}

function createTodo(server) {
  server.route({
    method: "POST",
    path: "/todos",
    handler: async (request, h) => {
      const result = await db.query(
        "INSERT INTO todo (id, title) values ($1, $2) RETURNING *",
        [request.payload.id, request.payload.title]
      );
      return result.rows;
    },
  });
}

module.exports = {
  getTodos,
  getTodosById,
  updateTodoById,
  deleteTodo,
  createTodo,
};
