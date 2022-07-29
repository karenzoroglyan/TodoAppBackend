const express = require("express");
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

const app = express();
const port = 3001;
app.use(express.json());

const myLogger = function (req, res, next) {
  let responeTimeBefore = new Date().getTime();
  next();
  let responeTimeAfter = new Date().getTime();
  let responseTime = responeTimeAfter - responeTimeBefore;

  debug("Request method: %s", req.method);
  debug("Request path: %s", req.path);
  debug("Request code: %s", res.statusCode);
  debug("Response time: %s", responseTime);
  debug("Request params: %O", req.params);
  debug("Request body: %O", req.body);
};

app.use(myLogger);

app.get("/todos", (req, res) => {
  res.send(database.findAll());
});

app.get("/todos/:todoId", (req, res) => {
  res.send(database.findById(req.params.todoId));
});

app.put("/todos/:todoId", (req, res) => {
  res.send(database.update(req.params.todoId, req.body.text));
});

app.delete("/todos/:todoId", (req, res) => {
  res.send(database.delete(req.params.todoId));
});

app.post("/todos", (req, res) => {
  res.send(
    database.create({
      id: req.body.id,
      title: req.body.title,
    })
  );
});

app.listen(port);
