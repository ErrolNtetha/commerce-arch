import Mailgen from "mailgen";
import { mailer } from "../../../config/config.js";
import nodemailer from "nodemailer";

/* Creating a nodemailer transport and returning the transport */
export const transporter = nodemailer.createTransport({
  host: mailer.nodemailer.host,
  port: mailer.nodemailer.port,
  secure: true,
  auth: {
    user: mailer.nodemailer.username,
    pass: mailer.nodemailer.password,
  },
});

/* Creating a new mailgen object with the theme and product details */
export const mailGenerator = new Mailgen({
  theme: "default", //salted
  product: {
    name: "CommerceArch",
    link: "https://domain.com/",
    logo: "https://domain.com/img/logo.png",
    copyright: "© 2022 CommerceArch. All Rights Reserved.",
  },
});
