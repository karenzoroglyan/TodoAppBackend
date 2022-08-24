const todo = require("../models/todo");
const user = require("../models/user");

function createUser(server) {
  server.route({
    method: "POST",
    path: "/register",
    handler: async (request, h) => {
      const result = await user.create({
        email: request.payload.email,
        password: request.payload.password,
      });
      return result;
    },
  });
}

function getTodos(server) {
  server.route({
    method: "GET",
    path: "/todos",
    handler: async (request, h) => {
      const todos = await todo.findAll();
      return todos;
    },
  });
}

function getTodosById(server) {
  server.route({
    method: "GET",
    path: "/todos/{todoId}",
    handler: async (request, h) => {
      const result = await todo.findOne({
        where: { id: request.params.todoId },
      });
      return result;
    },
  });
}

function createTodo(server) {
  server.route({
    method: "POST",
    path: "/todos",
    handler: async (request, h) => {
      const result = await todo.create({
        title: request.payload.title,
      });
      return result;
    },
  });
}

function updateTodoById(server) {
  server.route({
    method: "PUT",
    path: "/todos/{todoId}",
    handler: async (request, h) => {
      const text = request.payload.text;

      const result = await todo.update(
        {
          title: text,
        },
        {
          where: {
            id: request.params.todoId,
          },
        }
      );

      return result;
    },
  });
}

function deleteTodo(server) {
  server.route({
    method: "DELETE",
    path: "/todos/{todoId}",
    handler: async (request, h) => {
      const result = await todo.destroy({
        where: {
          id: request.params.todoId,
        },
      });
      return result;
    },
  });
}

module.exports = {
  createUser,
  getTodos,
  getTodosById,
  createTodo,
  updateTodoById,
  deleteTodo,
};
