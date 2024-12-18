import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/auth/register",
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
