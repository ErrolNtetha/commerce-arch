import dotenv from "dotenv";
dotenv.config();

/* This is a constant that is exported. It is an object with three properties: bcrypt, jwt, and maxAge. */
export const auth = {
  bcrypt: {
    salt: 12,
  },
  jwt: {
    secKey: process.env.JWT_SEC_KEY,
  },
  maxAge: {
    auth: 900000,
    resetPassword: 60 * 60 * 15,
  },
};

/* Exporting a constant called database. It is an object with two properties: MYSQL and MONGO. */
export const database = {
  MYSQL: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT,
  },
  MONGO: {
    url: process.env.MONGO_URL,
  },
};

/* Exporting a constant called mailer. It is an object with two properties: nodemailer and twilio. */
export const mailer = {
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    username: process.env.NODEMAILER_USERNAME,
    password: process.env.NODEMAILER_PASSWORD,
  },
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_TOKEN,
    mobile: process.env.TWILIO_MOBILE,
  },
};
