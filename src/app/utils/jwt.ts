import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });
};

export const verifyToken = (jwtToken: string) => {
  return jwt.verify(jwtToken, config.jwt_access_secret as string);
};
