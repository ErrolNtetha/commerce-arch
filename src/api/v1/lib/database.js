import { database } from "../../../config/config.js";
import { mongoose as mongo } from "mongoose";
import { Sequelize } from "sequelize";

/* Connecting to the mongo database. */
export const mongoose = mongo.connect(`${database.MONGO.url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Creating a new instance of Sequelize. */
export const sequelize = new Sequelize(
  database.MYSQL.database,
  database.MYSQL.username,
  database.MYSQL.password,
  {
    host: database.MYSQL.host,
    dialect: database.MYSQL.dialect,
  }
);
