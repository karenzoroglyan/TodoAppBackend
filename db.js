const pg = require("pg");
const config = {
  user: "postgres",
  password: "8899",
  host: "localhost",
  port: 5432,
  database: "todos",
};

const client = new pg.Client(config);
client.connect();

module.exports = client;
