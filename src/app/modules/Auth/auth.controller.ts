import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  if (req.cookies.token) {
    res.clearCookie("token");
  }

  res.cookie("token", accessToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User is logged in successfully!",
    data: { token: accessToken },
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
