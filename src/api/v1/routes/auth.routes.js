import express from "express";
import { authLimiter, createAccountLimiter, passwordResetLimiter } from "../middleware/limiter.js";
import { signIn, signUp, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", createAccountLimiter, signUp);
router.get("/login", authLimiter, signIn);
router.post('/reset-password', passwordResetLimiter, resetPassword);
export { router as authRoutes };
