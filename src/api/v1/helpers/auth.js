/*
 * Author: Moobi Kabelo
 * Date: 2022-26-24
 * Project commerce-arch/services/auth.services.js
 * Description :
 * Function: saveAuthentication (userId) <Promise> - saves authentication collection starter
 * Function: updateAuthentication (userId, data) <Promise> - updates authentication collection with new data
 */
import Authentication from "../models/authentication.js";
import { errorLog } from "../../../util/logger.js";

export const saveAuthentication = (userId) => {
  return new Promise((resolve, reject) => {
    const newAuth = new Authentication({
      _id: userId,
    });
    newAuth
      .save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        errorLog.error(`saveAuthentication: ${err}`);
        reject();
      });
  });
};

export const updateAuthentication = (userId, data) => {
  return new Promise((resolve, reject) => {
    Authentication.findByIdAndUpdate(userId, data, { new: true })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};
