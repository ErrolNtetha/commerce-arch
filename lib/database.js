/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/lib/db.js
 * Description: Lib for database. This lib is used to connect to the database
 * Function: mongoose () - Connects to the mongodb database and returns the connection
 * Function: sequelize () - Connects to the mysql database and returns the connection
 */
import { database } from "../config/config.js";
import { mongoose as mongo } from "mongoose";
import { Sequelize } from "sequelize";

export const mongoose = mongo.connect(`${database.MONGO.url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const sequelize = new Sequelize(
  database.MYSQL.database,
  database.MYSQL.username,
  database.MYSQL.password,
  {
    host: database.MYSQL.host,
    dialect: database.MYSQL.dialect,
  }
);
