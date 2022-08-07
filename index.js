const Hapi = require("@hapi/hapi");
const path = require("path");
const fs = require("fs");
const debug = require("debug")("application"),
  http = require("http"),
  name = "myapp";
const Database = require("./Database");
const db = require("./db");

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
  handler: async (request, h) => {
    const result = await db.query("SELECT * FROM todo");
    return result.rows;
  },
});

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
