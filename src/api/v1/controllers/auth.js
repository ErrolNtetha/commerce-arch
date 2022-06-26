import { auth } from "../../../config/config.js";
import bcrypt from "bcrypt";
import { errorLog } from "../../../util/logger.js";
import { findUser, findUserById, saveUser } from "../helpers/user.js";
import {
  findOtp,
  saveAuthentication,
  updateAuthentication,
} from "../helpers/auth.js";
import {
  sendPasswordResetEmail,
  sendPasswordResetSms,
} from "../services/auth.service.js";
import {
  generateJWT,
  generateOTP,
  generateOTPExpiryTime,
} from "../lib/auth.js";
import {
  validateEmail,
  validateMobile,
  validateOTP,
  validatePassword,
} from "../validator/auth.js";

/**
 * It creates a new user account
 * @param req - The request object.
 * @param res - The response object.
 */
export const signUp = (req, res) => {
  const { email, fullNames, mobile, password, confirmPassword } = req.body;

  findUser(email, mobile)
    .then((foundUser) => {
      if (foundUser) {
        return res.status(206).json({
          message: "Sorry, account already exists.",
          status: 206,
        });
      }

      validateEmail(email)
        .then(() => {
          validatePassword(password, confirmPassword)
            .then(() => {
              bcrypt.hash(password, 12).then((hashedPassword) => {
                saveUser(
                  fullNames,
                  email,
                  validateMobile(mobile),
                  hashedPassword
                )
                  .then((user) => {
                    saveAuthentication(user._id)
                      .then(() => {
                        const token = generateJWT(
                          user._id,
                          user.fullNames,
                          auth.maxAge.auth
                        );
                        res.cookie(user._id, token, {
                          maxAge: auth.maxAge.auth,
                          httpOnly: true,
                        });

                        res.status(201).json({
                          message: "Account created successfully.",
                          status: 201,
                        });
                      })
                      .catch((err) => {
                        res.status(500).json({
                          message: err,
                          status: 500,
                        });
                      });
                  })
                  .catch(() => {
                    res.status(500).json({
                      message: "Failed to create account, please try again.",
                      status: 500,
                    });
                  });
              });
            })
            .catch((err) => {
              res.status(400).json({
                message: err,
                status: 400,
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            message: err,
            status: 400,
          });
        });
    })
    .catch((err) => {
      errorLog.error(`findUser: ${err}`);
      res.status(500).json({
        message: "",
        status: 500,
      });
    });
};

/**
 * It takes in the user's email and password, finds the user in the database, compares the password
 * with the one in the database, and if they match, it generates a JWT and sends it back to the user
 * @param req - The request object.
 * @param res - The response object.
 */
export const signIn = (req, res) => {
  const { email, password } = req.body;

  findUser(email, "")
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({
          message: "Invalid email or password.",
          status: 404,
        });
      }
      bcrypt
        .compare(password, foundUser.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Invalid email or password.",
              status: 404,
            });
          }

          const token = generateJWT(
            foundUser._id,
            foundUser.fullNames,
            auth.maxAge.auth
          );
          res.cookie(foundUser._id, token, {
            maxAge: auth.maxAge.auth,
            httpOnly: true,
          });

          res.status(201).json({
            message: "Login successful",
            status: 201,
          });
        })
        .catch((err) => {
          errorLog.error(`bcryptCompare: ${err}`);
          res.status(500).json({
            message: "Invalid email or password.",
            status: 500,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
        status: 500,
      });
    });
};

/**
 * It checks if the user exists, if it does, it generates a JWT token and sends it to the user's email
 * address or generates an OTP and sends it to the user's mobile number
 * @param req - The request object.
 * @param res - The response object.
 */
export const resetPassword = (req, res) => {
  let qEmail = req.query.email;
  let qMobile = req.query.mobile;

  /* Checking if the query params are undefined and if they are, it is setting them to an empty string. */
  if (qEmail === undefined) qEmail = "";
  if (qMobile === undefined) qMobile = "";

  findUser(qEmail, validateMobile(qMobile))
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({
          message: "Sorry, account does not exist.",
          status: 404,
        });
      }

      if (qEmail) {
        const token = generateJWT(
          foundUser._id,
          foundUser.fullNames,
          auth.maxAge.auth
        );

        sendPasswordResetEmail(foundUser.email, foundUser.fullNames, token)
          .then((info) => {
            res.status(201).json({
              message: info,
              status: 201,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
              status: 500,
            });
          });
      } else if (qMobile) {
        const otp = generateOTP();

        /* Updating the authentication collection with the generated OTP and the OTP expiry time. */
        updateAuthentication(foundUser._id, {
          otp,
          otpExpire: generateOTPExpiryTime(otp, foundUser._id),
        })
          .then(() => {
            sendPasswordResetSms(foundUser.mobile, otp)
              .then((result) => {
                res.status(201).json({
                  message: result,
                  status: 201,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "send sms",
                  status: 500,
                });
              });
          })
          .catch((err) => {
            errorLog.error(`updateAuthentication ERROR: ${err}`);
            res.status(500).json({
              message: "Failed to fetch account, please try again.",
              status: 500,
            });
          });
      } else {
        return res.status(422).json({
          message: "Sorry, failed to process request .",
          status: 422,
        });
      }
    })
    .catch((err) => {
      errorLog.error(`findUser: ${err}`);
      res.status(500).json({
        message: "Sorry, failed to retrieve user, try again",
        status: 500,
      });
    });
};

/**
 * It finds a user by id, then finds the otp associated with that user, then validates the otp
 * @param req - The request object.
 * @param res - The response object.
 */
export const verifyOtp = (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;

  findUserById({
    _id: id,
  })
    .then((foundUser) => {
      if (!foundUser) {
        errorLog.error(`findUserById: ${foundUser}`);
        return res.status(404).json({
          message: "Sorry, account does not exist.",
          status: 404,
        });
      }

      findOtp(foundUser._id)
        .then((auth) => {
          if (!auth) {
            return res.status(404).json({
              message: "Sorry, account does not exist.",
              status: 404,
            });
          }
          validateOTP(otp, auth)
            .then(() => {
              res.status(201).json({
                id: foundUser._id,
                message: "OTP verified",
                status: 201,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: err,
                status: 500,
              });
            });
        })
        .catch((err) => {
          errorLog.error(`findOtp: ${err}`);
          res.status(500).json({
            message: "Sorry, failed to process request.",
            status: 500,
          });
        });
    })
    .catch((err) => {
      errorLog.error(`findUserById: ${err}`);
      res.status(500).json({
        message: "Sorry, failed to process request.",
        status: 500,
      });
    });
};

/**
 * It clears the cookie with the id of the user who is logging out
 * @param req - The request object.
 * @param res - The response object.
 */
export const signOut = (req, res) => {
  const { id } = req.params;

  res.clearCookie(id);
  res.status(200).json({
    message: "Logout successful",
    status: "200",
  });
};
