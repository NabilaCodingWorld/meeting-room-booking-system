import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { Request, Response } from "express";

const signUp = catchAsync(async (req:Request, res:Response) => {
  const result = await UserServices.signUpUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req:Request, res:Response) => {
  const result = await UserServices.loginUserIntoDB(req.body);
  const { token, data } = result;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: token,
    data: data,
  });
});

export const UserController = {
  signUp,
  loginUser,
};
