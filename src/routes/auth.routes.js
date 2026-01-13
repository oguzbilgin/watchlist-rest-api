import express from "express";
import {
  login,
  logOut,
  register
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { valideRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post('/register', valideRequest(registerSchema), register);
router.post('/login', valideRequest(loginSchema), login);
router.post('/logout', logOut);

export default router;