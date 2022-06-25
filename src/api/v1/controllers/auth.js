import { auth } from "../../../config/config.js";
import bcrypt from "bcrypt";
import { errorLog } from "../../../util/logger.js";
import {
  generateJWT,
  generateOTP,
  generateOTPExpiryTime,
} from "../lib/auth.js";
import { findUser, saveUser } from "../helpers/user.js";
import { saveAuthentication, updateAuthentication } from "../helpers/auth.js";
import { sendPasswordResetSms } from "../services/notification.service.js";
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from "../validator/auth.js";

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
              // encrypt password using bcrypt
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

export const signIn = (req, res) => {
  const { email, password } = req.body;

  findUser(email, "")
    .then((foundUser) => {
      // check if user not exist
      if (!foundUser) {
        return res.status(401).json({
          message: "Invalid email or password.",
          status: 404,
        });
      }
      // decrypt and compare password
      bcrypt
        .compare(password, foundUser.password)
        .then((valid) => {
          // if password dont match return error
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

export const resetPassword = (req, res) => {
  const { email, method } = req.body;

  findUser(email, "")
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({
          message: "Sorry, account does not exist.",
          status: 404,
        });
      }

      if (method === "email") {
        // TODO: implement send email functionality
      } else if (method === "sms") {
        // TODO: implement send sms functionality
        const otp = generateOTP();

        // save otp and expire date to authentication
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
        return res.status(500).json({
          message: "Failed to fetch account, please try again.",
          status: 500,
        });
      }
    })
    .catch((err) => {
      errorLog.error(`findUsere: ${err}`);
      res.status(500).json({
        message: "find user",
        status: 500,
      });
    });
};

export const signOut = (req, res) => {
  const { id } = req.params;

  res.clearCookie(id);
  res.status(200).json({
    message: "Logout successful",
    status: "200",
  });
};
