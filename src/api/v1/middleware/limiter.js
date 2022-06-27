import rateLimit from "express-rate-limit";

/* Limiting the number of requests that can be made to the server.  when signing in*/
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message:
    "Too many password attempts from this IP, please try again after an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

/* Limiting the number of requests that can be made to the server when creating an account. */
export const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many request from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

/* Limiting the number of requests that can be made to the server when requesting a password reset. */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 4,
  message:
    "Too many password request from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});
