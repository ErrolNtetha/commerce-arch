/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/helpers/auth.js
 * Description: Helper for authentication. This helper is used to validate the user's credentials (email and password)
 * Function: comparePassword (password, hashedPassword) <Promise> - Decrypt password in database and compare it with password provided by password
 * Function: validateEmail (email)  <Promise> - Validates the email address provided by the user and returns error if not valid
 * Function validateMobile (mobile) <Promise> - Adds country code to mobile
 * Function: validatePassword (password, confirmPassword) <Promise> - Validates the passwords provided by the user and returns the
 *                                                          confirmPassword if is valid and returns a hashed password
 */
import { auth } from "../config/config.js";
import bcrypt from "bcrypt";
import { errorLog } from "../util/logger.js";
import validator from "validator";

export const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hashedPassword)
      .then((isMatch) => {
        resolve(isMatch);
      })
      .catch((err) => {
        errorLog.error(`comparePassword ERROR: ${err}`);
        reject(new Error("Failed to login, please try again."));
      });
  });
};

export const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmail(email)) {
      resolve();
    } else {
      reject(new Error("Sorry, invalid email."));
    }
  });
};

export const validateMobile = (mobile) => {
  if (mobile[0] === "0") {
    return mobile.replace(mobile.indexOf("0"), "+27").replace(/\s/g, "");
  }
  return mobile;
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
      bcrypt
        .hash(confirmPassword, auth.bcrypt.salt)
        .then((hashedPassword) => {
          resolve(hashedPassword);
        })
        .catch((err) => {
          // FIXME: return valid error
          errorLog.error(new Error(`Bcrypt ERROR: ${err}`));
          reject(new Error(err));
        });
    }
  });
};
