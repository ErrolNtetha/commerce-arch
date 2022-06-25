/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/lib/mail.js
 * Description: Lib for mail. This lib is used to create nodemailer transport and mailgen
 * Function: transporter () - Creates a nodemailer transport and returns the transport
 * Function: mailGenerator () - Creates a mailgen object, theme and returns the mailgen object
 */
import Mailgen from "mailgen";
import { mailer } from "../../../config/config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: mailer.nodemailer.host,
  port: mailer.nodemailer.port,
  secure: true,
  auth: {
    user: mailer.nodemailer.username,
    pass: mailer.nodemailer.password,
  },
});

export const mailGenerator = new Mailgen({
  theme: "salted", //default
  product: {
    name: "CommerceArch",
    link: "https://domain.com/",
    logo: "https://domain.com/img/logo.png",
    copyright: "© 2022 CommerceArch. All Rights Reserved.",
  },
});
