/*
 * Author: Moobi Kabelo
 * Date: 2022-26-24
 * Project commerce-arch/services/auth.services.js
 * Description: Services for authentication. This service is used to do CRUD operations on User model
 * Function: findUser (email) <Promise> - Checks if user already exists in database
 * Function: deleteUser (userId) <Promise> - Deletes user from database
 * Function: saveAuthentication <Promise> -  Saves user's authentication details in database
 * Function: saveUser <Promise> - Adds new user to database
 */

import Authentication from "../models/authentication.js";
import User from "../models/user.js";

export const saveAuthentication = (userId) => {
  const newAuth = new Authentication({
    _id: userId,
  });
  return newAuth.save();
};

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
        reject(
          new Error({
            error: err,
            message: "Failed to create account, please try again.",
            status: 500,
          })
        );
      });
  });
};

export const findUser = (email) => {
  return User.findOne({
    email: {
      $eq: email,
    },
  });
};

export const updateUser = () => {};

export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};
