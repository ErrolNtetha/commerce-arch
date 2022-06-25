/*
 * Author: Moobi Kabelo
 * Date: 2022-26-24
 * Project commerce-arch/services/auth.services.js
 * Description: Services for authentication. This service is used to do CRUD operations on User model
 * Function: findUser (email) <Promise> - Checks if user already exists in database
 * Function: deleteUser (userId) <Promise> - Deletes user from database
 * Function: updateUser <Promise> -  Updated users details in database
 * Function: saveUser <Promise> - Adds new user to database
 */
import { errorLog } from "../../../util/logger.js";
import User from "../models/user.js";

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

export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};
