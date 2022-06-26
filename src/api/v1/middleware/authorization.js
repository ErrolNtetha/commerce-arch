import { auth } from "../../../config/config.js";
import jwt from "jsonwebtoken";

/**
 * If the token is valid, the user is authenticated and the request is allowed to proceed
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a callback function that is called when the middleware is complete.
 * @returns A function that takes in three parameters: req, res, and next.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, auth.jwt.secKey, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token.",
          status: 403,
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "You are not authenticated.",
      status: 401,
    });
  }
};

/**
 * It verifies the token, then checks if the user id in the token matches the user id in the request
 * params. If it does, it calls the next function in the middleware chain. If it doesn't, it returns a
 * 403 error
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that is called when the middleware is done.
 */
export const authorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    }
    return res.status(403).json({
      message: "Sorry, you are not allowed.",
      status: 403,
    });
  });
};
