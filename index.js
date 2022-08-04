const Hapi = require("@hapi/hapi");
const path = require("path");
const fs = require("fs");
const debug = require("debug")("application"),
  http = require("http"),
  name = "myapp";
const Database = require("./Database");

const currentDir = path.resolve();

const backupPath = path.join(currentDir, "todos", "todos.json");

const backupContents = fs.readFileSync(backupPath, "utf8");
const todos = JSON.parse(backupContents);

const database = new Database(todos);

process.once("SIGINT", (code) => {
  console.log("Process beforeExit event with code: ", code);

  const data = database.data;
  fs.writeFileSync(backupPath, JSON.stringify(data));
  process.exit();
});

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.start();

console.log("server start");

const myLoggerPlugin = {
  name: "myLoggerPlugin",
  version: "1.0.0",
  register: async function (server, options) {
    server.ext("onPreResponse", function (request, h) {
      let responeTimeBefore = new Date().getTime();
      let responeTimeAfter = new Date().getTime();
      let responseTime = responeTimeAfter - responeTimeBefore;

      debug("Request method: %s", request.method);
      debug("Request path: %s", request.path);
      debug("Request code: %s", request.statusCode);
      debug("Response time: %s", responseTime);
      debug("Request params: %O", request.params);
      debug("Request body: %O", request.payload);

      return h.continue;
    });
  },
};

server.register({
  plugin: myLoggerPlugin,
});

server.route({
  method: "GET",
  path: "/todos",
  handler: (request, h) => {
    return database.findAll();
  },
});

server.route({
  method: "GET",
  path: "/todos/{todoId}",
  handler: function (request, h) {
    return database.findById(request.params.todoId);
  },
});

server.route({
  method: "PUT",
  path: "/todos/{todoId}",
  handler: async (request, h) => {
    const todoId = request.params.todoId;
    const text = request.payload.text;

    const result = database.update(todoId, text);

    return result;
  },
});

server.route({
  method: "DELETE",
  path: "/todos/{todoId}",
  handler: function (request, h) {
    return database.delete(request.params.todoId);
  },
});

server.route({
  method: "POST",
  path: "/todos",
  handler: function (request, h) {
    return database.create({
      id: request.payload.id,
      title: request.payload.title,
    });
  },
});
