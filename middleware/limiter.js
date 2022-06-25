import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // per minute
  max: 50, // limit each IP to 50 requests per windowMs
  message:
    "Too many password attempts from this IP, please try again after an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // per min
  max: 50, // limit each IP to 50 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // per hour
  max: 4, // limit each IP to 4 requests per windowMs
  message:
    "Too many password request from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});
