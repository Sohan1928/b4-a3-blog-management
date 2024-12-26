import { IRegisterUser, ILoginUser } from "./auth.interface";
import { User } from "../user/user.model";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { createToken } from "./auth.utils";

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const result = await User.create(payload);
  return {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
  };
};

const loginUser = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  // console.log("user found", user);
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");
  }

  // checking if the user is already blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "This user is already blocked!"
    );
  }

  // checking if the password is match
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");

  // create token
  const jwtPayload = {
    email: user.email,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
};
