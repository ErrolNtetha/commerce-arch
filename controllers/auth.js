import { auth } from "../config/config.js";
import { errorLog } from "../util/logger.js";
import { generateJWT } from "../lib/jwt.js";
import {
  deleteUser,
  findUser,
  saveAuthentication,
  saveUser,
} from "../services/auth.service.js";import {
  comparePassword,
  validateEmail,
  validateMobile,
  validatePassword,
} from "../helpers/auth.js";

export const signUp = (req, res) => {
  const { email, fullNames, mobile, password, confirmPassword } = req.body;

  findUser(email)
    .then((foundUser) => {
      // if foundUser return error
      if (foundUser) {
        return res.status(401).json({
          message: "Sorry, account already exists.",
          status: 401,
        });
      }
      validateEmail(email)
        .then(() => {
          // validate password and return hashed password
          validatePassword(password, confirmPassword)
            .then((hashedPassword) => {
              saveUser(fullNames, email, validateMobile(mobile), hashedPassword)
                .then((user) => {
                  saveAuthentication(user._id)
                    .then(() => {
                      // TODO: generate token
                      const token = generateJWT(
                        user._id,
                        user.fullNames,
                        auth.maxAge.auth
                      );
                      // slice token from index[0] till first '.'
                      const cookieName = token.slice(0, token.indexOf("0"));
                      res.cookie(cookieName, token, {
                        maxAge: auth.maxAge.auth,
                        httpOnly: true,
                      });
                      res.status(201).json({
                        message: "Account created successfully.",
                        status: 201,
                      });
                      return true;
                    })
                    .catch((err) => {
                      errorLog.error(`saveAuthentication Error: ${err}`);
                      // TODO: delete user
                      deleteUser(user._id)
                        .then(() => {
                          res.status(500).json({
                            message:
                              "Failed to create account, please try again.",
                            status: 500,
                          });
                        })
                        .catch((error) => {
                          errorLog.error(`deleteUser Error: ${error}`);
                          res.status(500).json({
                            message:
                              "Failed to create account, please try again.",
                            status: 500,
                          });
                        });
                    });
                })
                .catch((err) => {
                  errorLog.error(`saveUser Error: ${err.error}`);
                  res.status(500).json({
                    message: err.message,
                    status: 500,
                  });
                });
            })
            .catch((err) => {
              errorLog.error(`validatePassword Error: ${err}`);
              res.status(500).json({
                message: err,
                status: 500,
              });
            });
        })
        .catch((err) => {
          errorLog.error(`validateEmail Error: ${err}`);
          res.status(500).json({
            message: err,
            status: 500,
          });
        });
    })
    .catch((err) => {
      errorLog.error(`findUser Error: ${err}`);
      res.status(500).json({
        message: "Failed to create account, please try again.",
        status: 500,
      });
    });
};

export const signIn = (req, res) => {
  const { email, password } = req.body;

  findUser(email)
    .then((foundUser) => {
      // if not foundUser return error
      if (!foundUser) {
        return res.status(401).json({
          message: "Invalid email or password.",
          status: 404,
        });
      }
      // compare password
      comparePassword(password, foundUser.password)
        .then((isValid) => {
          if (!isValid) {
            return res.status(404).json({
              message: "Invalid email or password.",
              status: 404,
            });
          }

          const token = generateJWT(
            foundUser._id,
            foundUser.fullNames,
            auth.maxAge.auth
          );
          // slice token from index[0] till first '.'
          const cookieName = token.slice(0, token.indexOf("0"));
          res.cookie(cookieName, token, {
            maxAge: auth.maxAge.auth,
            httpOnly: true,
          });
          res.status(201).json({
            message: "Login successful",
            status: 201,
          });
          return true;
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
            status: 500,
          });
        });
    })
    .catch((err) => {
      errorLog.error(`findUser Error: ${err}`);
      res.status(500).json({
        message: "Failed to login, please try again.",
        status: 500,
      });
    });
};
