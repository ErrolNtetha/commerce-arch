/*
 * Author: Moobi Kabelo
 * Date: 2022-26-24
 * Project commerce-arch/services/notification.services.js
 * Description :
 * Function: sendPasswordResetEmail (email, fullNames, token) <Promise> - service to send password reset link via email to user
 * Function: sendPasswordResetSms (mobile, otp) <Promise> - service to send OTP to user via sms (mobile)
 */
import { createRequire } from "module";
import { mailer } from "../../../config/config.js";
import { transporter } from "../lib/mail.js";
import { passwordResetEmail } from "../templates/auth.js";
import { errorLog, successLog } from "../../../util/logger.js";

const require = createRequire(import.meta.url);
const twilio = require("twilio")(mailer.twilio.sid, mailer.twilio.token);

export const sendPasswordResetEmail = (email, fullNames, token) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: mailer.nodemailer.username,
        to: email,
        subject: "Password Reset",
        html: passwordResetEmail(fullNames, token),
      },
      (err, info) => {
        if (err) {
          errorLog.error(`passwordResetEmail ERROR: ${err}`);
          reject(
            new Error("Failed to send password reset email, please try again.")
          );
        }
        successLog.info(`passwordResetEmail SUCCESS: ${info}`);
        resolve("Password reset email sent, check your inbox");
      }
    );
  });
};

export const sendPasswordResetSms = (mobile, otp) => {
  return new Promise((resolve, reject) => {
    twilio.messages
      .create({
        body: `Your Commerce-Arch OTP is : <a hre="">${otp}</a>. Do not share this OTP with anyone. OTP expires in 15min.`,
        from: mailer.twilio.mobile,
        to: mobile,
      })
      .then((info) => {
        successLog.info(`passwordResetSms: ${info}`);
        resolve("Password reset SMS sent, check your inbox");
      })
      .catch((err) => {
        errorLog.error(`passwordResetSms ERROR: ${err}`);
        reject(new Error("Failed to send password reset SMS, try again."));
      });
  });
};
