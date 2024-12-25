import { Document, Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constants";

export interface IUser extends Document {
  [a: string]: any;
  name: string;
  email: string;
  password: string;
  // role?: "admin" | "user";
  role?: string;
  isBlocked?: boolean;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
