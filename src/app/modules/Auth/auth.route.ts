import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  AuthControllers.registerUser
);

router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
