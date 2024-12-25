// import bcrypt from "bcrypt";
// import { StatusCodes } from "http-status-codes";
// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import { Request, Response } from "express";
// import { generateToken } from "../../utils/jwt";
// import { UserServices } from "./user.service";
// import { User } from "./user.model";

// const registerUser = catchAsync(async (req, res) => {
//   const payload = req.body;

//   const result = await UserServices.createUserIntoDB(payload);

//   const jwtPayload = {
//     userId: result._id.toString(),
//     role: result.role || "user",
//   };

//   const accessToken = generateToken(jwtPayload);

//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     success: true,
//     message: "User registered successfully",
//     data: {
//       ...result.toObject(),
//       accessToken,
//     },
//   });
// });

// const getAllUsers = catchAsync(async (req, res) => {
//   const result = await UserServices.getAllUsersFromDB();

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Users are retrieved successfully",
//     data: result,
//   });
// });

// const getSingleUser = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   const result = await UserServices.getSingleUserFromDB(userId);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "User is retrieved successfully",
//     data: result,
//   });
// });

// const updateUser = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   const result = await UserServices.updateStudentIntoDB(userId, req.body);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "User is updated successfully",
//     data: result,
//   });
// });

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   // check if user exists
//   const user = await User.findOne({ email });
//   if (!user) {
//     return sendResponse(res, {
//       statusCode: StatusCodes.UNAUTHORIZED,
//       success: false,
//       message: "Invalid credentials",
//       data: null,
//     });
//   }

//   // check if password matches
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return sendResponse(res, {
//       statusCode: StatusCodes.UNAUTHORIZED,
//       success: false,
//       message: "Invalid credentials",
//       data: null,
//     });
//   }

//   // Generate json web token
//   const jwtToken = generateToken({ id: user._id, role: user.role });

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Login successfully!",
//     data: { jwtToken },
//   });
// });

// export const UserControllers = {
//   registerUser,
//   getAllUsers,
//   getSingleUser,
//   updateUser,
//   loginUser,
// };
