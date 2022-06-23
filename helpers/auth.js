/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/helpers/auth.js
 * Description: Helper for authentication. This helper is used to validate the user's credentials (email and password)
 * Function: validateEmail (email) - Validates the email address provided by the user and returns the email if is valid
 * Function: validatePassword (password, confirmPassword) - Validates the passwords provided by the user and returns the confirmPassword if is valid
 */
import isEmail from "validator/lib/isEmail.js";

export const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!isEmail(email)) {
      reject(new Error("Sorry, email is not valid,"));
    }
    resolve(email);
  });
};

export const validatePassword = (password, confirmPassword) => {
  return new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      reject(new Error("Sorry, passwords does not match."));
    } else if (password.length < 8) {
      reject(new Error("Sorry, password must be at least 8 characters long."));
    } else if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g)
    ) {
      reject(
        new Error(
          "Password must contain at least one lowercase letter, one uppercase letter, and one number."
        )
      );
    } else {
      resolve(confirmPassword);
    }
  });
};
