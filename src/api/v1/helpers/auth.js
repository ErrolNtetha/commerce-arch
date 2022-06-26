import Authentication from "../models/authentication.js";
import { errorLog } from "../../../util/logger.js";

/**
 * It saves a new authentication document to the database
 * @param userId - The user's id.
 * @returns A promise that resolves if the authentication is saved and rejects if there is an error.
 */
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

/**
 * It finds the user by the userId and updates the data with the new data
 * @param userId - The id of the user you want to update.
 * @param data - The data to be updated.
 * @returns A promise that resolves to the updated authentication object.
 */
export const updateAuthentication = (userId, data) => {
  return new Promise((resolve, reject) => {
    Authentication.findByIdAndUpdate(userId, data, { new: true })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        errorLog.error(`updateAuthentication: ${err}`);
        reject(new Error(err));
      });
  });
};

/**
 * It finds the user's OTP from the database
 * @param userId - The userId of the user you want to find the OTP for.
 * @returns A promise that resolves to the result of the findById query.
 */
export const findOtp = (userId) => {
  return new Promise((resolve, reject) => {
    Authentication.findById(userId)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        errorLog.error(`findOtp: ${err}`);
        reject(new Error(err));
      });
  });
};
