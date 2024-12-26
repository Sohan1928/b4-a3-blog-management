import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./auth.validation";

const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  AuthControllers.registerUser
);

AuthRoutes.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  AuthControllers.loginUser
);

export default AuthRoutes;
