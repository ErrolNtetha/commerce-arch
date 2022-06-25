import express from "express";
import { authLimiter, createAccountLimiter } from "../middleware/limiter.js";
import { signIn, signUp } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", createAccountLimiter, signUp);
router.get("/login", authLimiter, signIn);

export { router as authRoutes };
