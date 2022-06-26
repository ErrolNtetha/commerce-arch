import { createRequire } from "module";
import { mailer } from "../../../config/config.js";
import { transporter } from "../lib/mail.js";
import { passwordResetEmail } from "../templates/auth.js";
import { errorLog, successLog } from "../../../util/logger.js";

const require = createRequire(import.meta.url);
const twilio = require("twilio")(mailer.twilio.sid, mailer.twilio.token);

/**
 * It sends a password reset email to the user's email address
 * @param email - The email address of the user requesting a password reset.
 * @param fullNames - The full names of the user
 * @param token - This is the token that will be sent to the user's email.
 * @returns A promise that resolves to a string or rejects to an error.
 */
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
        successLog.info(`passwordResetEmail SUCCESS: ${info.sid}`);
        resolve("Password reset email sent, check your inbox");
      }
    );
  });
};

/**
 * It sends a password reset SMS to the user's mobile number
 * @param mobile - The mobile number to send the SMS to.
 * @param otp - The OTP that will be sent to the user's mobile number.
 * @returns A promise that resolves to a string or rejects to an error.
 */
export const sendPasswordResetSms = (mobile, otp) => {
  return new Promise((resolve, reject) => {
    twilio.messages
      .create({
        body: `Your Commerce-Arch OTP is : ${otp}. Do not share this OTP with anyone. OTP expires in 15min.`,
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
