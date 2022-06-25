/*
 *
 */
import dotenv from "dotenv";
dotenv.config();

// jwt, bcrypt config
export const auth = {
  bcrypt: {
    salt: 12, // process.env.BCRYPT_SALT
  },
  jwt: {
    secKey: "commerce-arch", //process.env.JWT_SEC_KEY
  },
  maxAge: {
    auth: 1000 * 60 * 60 * 24 * 7,
    resetPassword: 1000 * 60 * 60 * 1 * 7,
  },
};
// database connection details
export const database = {
  MYSQL: {
    database: "commerce_arch", // process.env.MYSQL_DATABASE
    username: "elregalo", //process.env.MYSQL_USERNAME
    password: "Mk327452_", // process.env.MYSQL_PASSWORD
    host: "127.0.0.1", // process.env.MYSQL_HOST
    dialect: "mariadb", // process.env.MYSQL_DIALECT
  },
  MONGO: {
    url: "mongodb://0.0.0.0:27017/commerce-arch", //process.env.MONGO_URL,
  },
};
// nodemailer connections details
export const mailer = {
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    username: process.env.NODEMAILER_USERNAME,
    password: process.env.NODEMAILER_PASSWORD,
  },
};
