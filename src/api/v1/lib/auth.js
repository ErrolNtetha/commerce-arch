import { auth } from "../../../config/config.js";
import jwt from "jsonwebtoken";
import optGenerator from "otp-generator";

/**
 * It generates an 8 digit OTP with digits, special characters and upper case alphabets
 * @returns A function that returns a string of 8 characters.
 */
export const generateOTP = () => {
  return optGenerator.generate(8, {
    digits: true,
    specialChars: false,
    upperCaseAlphabets: true,
  });
};

/**
 * It generates a JWT token with the OTP and userId as payload, and sets the expiry time to 15 minutes
 * @param otp - The OTP that you want to generate.
 * @param userId - The user's ID
 * @returns A JWT token
 */
export const generateOTPExpiryTime = (otp, userId) => {
  return jwt.sign(
    {
      token: otp,
      id: userId,
    },
    auth.jwt.secKey,
    {
      expiresIn: 60 * 60 * 15,
    }
  );
};

/**
 * It takes in a userId, fullNames and expires as arguments and returns a JWT token
 * @param userId - The user's id
 * @param fullNames - The full names of the user.
 * @param expires - This is the time in seconds that the token will be valid for.
 * @returns A JWT token
 */
export const generateJWT = (userId, fullNames, expires) => {
  return jwt.sign(
    {
      id: userId,
      username: fullNames,
    },
    auth.jwt.secKey,
    {
      expiresIn: expires,
    }
  );
};
