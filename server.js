const Hapi = require("@hapi/hapi");
const LoggerPlugin = require("./plugins/LoggerPlugin");
const {
  getTodos,
  getTodosById,
  updateTodoById,
  createTodo,
  deleteTodo,
} = require("./routes/routes");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

getTodos(server);
getTodosById(server);
updateTodoById(server);
createTodo(server);
deleteTodo(server);

server.start();

server.register({
  plugin: LoggerPlugin,
});
