/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/helpers/otp.js
 * Description: Helper for generating OTP. This helper is used to generate a random OTP and otp expiry time
 * Function: generateOTP () - Generates a random OTP and returns the OTP
 * Function: generateOTPExpiryTime (otp, userId) - Generates otp expiry time using JsonWebToken and returns the jwt token
 * Function: generateJWT (userId, fullNames, expires) - Generates a jwt token and returns the jwt token
 */
import { auth } from "../../../config/config.js";
import jwt from "jsonwebtoken";
import optGenerator from "otp-generator";

export const generateOTP = () => {
  return optGenerator.generate(8, {
    digits: true,
    specialChars: false,
    upperCaseAlphabets: true,
  });
};
//
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
