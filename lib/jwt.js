/*
 * Author: Moobi Kabelo
 * Date: 2022-06-22
 * Project: commerce-arch/lib/jwt.js
 * Description: Lib for jwt. This lib is used to generate and verify jwt tokens
 * Function: generateJWT (userId, fullNames, expires) - Generates a jwt token and returns the jwt token
 */
import { auth } from "../config/config.js";
import jwt from "jsonwebtoken";

export const maxAge = 1000 * 60 * 60 * 24 * 7;

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
