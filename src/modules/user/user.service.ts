import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "../../utils/createToken";
import config from "../../config";

const signUpUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password did not matched");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const userObject = user.toObject() as any;
  const { password, ...userWithoutPassword } = userObject;

  return {
    token: accessToken,
    data: userWithoutPassword,
  };
};

export const UserServices = {
  signUpUserIntoDB,
  loginUserIntoDB,
};
