// import express from "express";
// import { UserValidation } from "./user.validation";
// import { UserControllers } from "./user.controller";
// import validateRequest from "../../middlewares/validateRequest";
// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "./user.constants";

// const router = express.Router();

// router.post(
//   "/register",
//   validateRequest(UserValidation.registerUserValidationSchema),
//   UserControllers.registerUser
// );

// router.get("/register/:userId", UserControllers.getSingleUser);

// router.get("/register", UserControllers.getAllUsers);

// router.patch(
//   "/register/:userId",
//   validateRequest(UserValidation.updateUserValidationSchema),
//   UserControllers.updateUser
// );

// // router.post(
// //   "/login",
// //   validateRequest(UserValidation.loginUserValidationSchema),
// //   UserControllers.loginUser
// // );

// export const UserRoutes = router;
