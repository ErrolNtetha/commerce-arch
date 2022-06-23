import winston from "winston";
import "winston-daily-rotate-file";

export const errLog = winston.createLogger({
  name: "error",
  level: "error",
  json: true,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "../logs/error-%DATE%.log",
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
      filename: "../logs/success-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
