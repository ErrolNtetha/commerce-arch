import { mailGenerator } from "../lib/mail.js";

/**
 * It takes in two parameters, fullNames and token, and returns an object with a body property that
 * contains the email body
 * @param fullNames - The user's full names
 * @param token - This is the token that will be sent to the user's email address.
 * @returns An object with a body property that contains the email body.
 */
export const passwordResetEmail = (fullNames, token) => {
  const email = {
    body: {
      title: "Password Reset",
      intro: `Hi ${fullNames}, a password reset request has been sent.`,
      action: {
        instructions:
          "To reset your password please click on the button below, if you did not request a password reset. Please ignore this email ",
        button: {
          color: "#003650",
          text: "Reset Password",
          link: `https://domain.com/password-reset?${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to commerce.arch@afridek.com, we'd love to help.",
      signature: false,
    },
  };
  return mailGenerator.generate(email);
};

/**
 * It takes in two parameters, fullNames and logger, and returns an object with a body property that
 * contains the email body
 * @param fullNames - The user's full names.
 * @param logger - This is the object that contains the device, location and time of the user.
 * @returns An object with a body property.
 */
export const passwordAlertEmail = (fullNames, logger) => {
  const email = {
    body: {
      title: "Password Reset Alert",
      intro: `Hi, ${fullNames} Your password has been changed on`,
      table: {
        data: [
          {
            item: "Device",
            description: `Device: ${logger.device}`,
          },
          {
            item: "Location",
            description: `Location: ${logger.location}`,
          },
          {
            item: "Time",
            description: `Time: ${logger.time}`,
          },
        ],
        columns: {
          customWidth: {
            item: "20%",
            description: "30%",
          },
        },
      },
      action: {
        instructions:
          "If you did not reset your password, please log into your account and update your password.",
        button: {
          color: "#003650",
          text: "Go to account.",
          link: `https://domain.com/dashboard/password`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to commerce.arch@afridek.com, we'd love to help.",
      signature: false,
    },
  };

  return mailGenerator.generate(email);
};
