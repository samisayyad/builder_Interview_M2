import { Router } from "express";
import {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "@server/controllers/auth.controller";

const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/refresh", handleRefreshToken);
router.post("/logout", handleLogout);

export const authRouter = router;
