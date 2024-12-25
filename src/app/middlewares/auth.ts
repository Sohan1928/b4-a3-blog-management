import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    // checking if the token is missing
    if (!authToken || authToken.startsWith("Bearer")) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }

    // extract the token
    const token = authToken.split(" ")[1];

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsById(email);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not exist!");
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus === true) {
      throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked ! !");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
