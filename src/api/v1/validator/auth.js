import jwt from "jsonwebtoken";
import validator from "validator";

/**
 * If the email is valid, resolve the promise, otherwise reject it.
 * @param email - The email address to validate.
 * @returns A promise that resolves if the email is valid, and rejects if it is not.
 */
export const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmail(email)) {
      resolve();
    } else {
      reject(new Error("Sorry, invalid email."));
    }
  });
};

/**
 * It takes a mobile number as a string, checks if the first character is a zero, if it is, it replaces
 * the zero with a +27(country code), and then removes all spaces
 * @param mobile - The mobile number to be validated.
 * @returns the mobile number with the first digit replaced with +27 and any spaces removed.
 */
export const validateMobile = (mobile) => {
  if (mobile[0] === "0") {
    return mobile.replace(mobile.indexOf("0"), "+27").replace(/\s/g, "");
  }
  return mobile;
};

/**
 * It returns a promise that resolves if the password is valid, and rejects if the password is invalid
 * @param password - The password that the user entered.
 * @param confirmPassword - The password that the user entered in the confirm password field.
 * @returns A promise that resolves if the password is valid, and rejects if the password is invalid.
 */
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
      resolve();
    }
  });
};

/**
 * It takes in an OTP and an auth object, and returns a promise that resolves if the OTP is valid, and
 * rejects if it's not
 * @param opt - The OTP that the user has entered.
 * @param auth - The auth object that was returned from the database.
 * @returns A promise that resolves if the OTP is valid, and rejects if it is not.
 */
export const validateOTP = (opt, auth) => {
  return new Promise((resolve, reject) => {
    if (opt === auth.otp) {
      jwt.verify(opt, auth.otpExpiry, (err) => {
        if (err) {
          reject(new Error("Sorry, OTP has expired."));
        } else {
          resolve();
        }
      });
    }
    reject(new Error("Sorry, invalid OTP."));
  });
};
