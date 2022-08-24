const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = user;
