/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/util/logger.js
 * Description: Lib for logger. This lib is used to log messages
 * Function: errorLog (message) - Logs a error message
 * Function: successLog (message) - Logs an success message
 */
import "winston-daily-rotate-file";
import winston from "winston";


export const errorLog = winston.createLogger({
  name: "error",
  level: "error",
  json: true,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "./logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export const successLog = winston.createLogger({
  name: "success",
  level: "info",
  json: true,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "./logs/success-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
