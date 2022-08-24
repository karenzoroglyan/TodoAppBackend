const Hapi = require("@hapi/hapi");

const {
  getTodos,
  getTodosById,
  createTodo,
  updateTodoById,
  deleteTodo,
  createUser,
} = require("./routes/routes");

const initServer = () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  createUser(server);
  getTodos(server);
  getTodosById(server);
  createTodo(server);
  updateTodoById(server);
  deleteTodo(server);

  return server;
};

module.exports = initServer;
