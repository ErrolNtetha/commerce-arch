import "winston-daily-rotate-file";
import winston from "winston";

/* Creating a logger for errors */
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

/* Creating a logger for success messages */
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
