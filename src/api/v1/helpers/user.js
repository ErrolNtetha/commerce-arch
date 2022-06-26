import { errorLog } from "../../../util/logger.js";
import User from "../models/user.js";

/**
 * It creates a new user and saves it to the database
 * @param fullNames - The full names of the user.
 * @param email - The email address of the user.
 * @param mobile - The user's mobile number.
 * @param password - The password that the user entered.
 * @returns A promise
 */
export const saveUser = (fullNames, email, mobile, password) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      fullNames,
      email,
      mobile,
      password,
    });

    newUser
      .save()
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        errorLog.error(`saveUser: ${err}`);
        reject();
      });
  });
};

/**
 * "Find a user by email or mobile number."
 *
 * The function takes two parameters: email and mobile
 * @param email - The email address of the user.
 * @param mobile - {
 * @returns A promise
 */
export const findUser = (email, mobile) => {
  return User.findOne({
    $or: [
      {
        email: {
          $eq: email,
        },
      },
      {
        mobile: {
          $eq: mobile,
        },
      },
    ],
  });
};

export const findUserById = (id) => {
  return User.findById(id);
};

/**
 * It finds a user by their id and deletes them
 * @param userId - The id of the user to delete.
 * @returns The user object that was deleted.
 */
export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};
