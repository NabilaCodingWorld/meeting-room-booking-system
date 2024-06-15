import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route."
      );
    }
    const extractedToken = token.split("Bearer ")[1];
    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        extractedToken,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route."
      );
    }

    const { role, email, iat } = decoded;

    const user = await User.isUserExists(email);

    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route."
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //  req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
