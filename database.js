const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todos", "postgres", "8899", {
  dialect: "postgres",
  host: "localhost",
});


try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
