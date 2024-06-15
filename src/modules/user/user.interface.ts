import { Document } from "mongoose";
import { Model } from "mongoose";
import { USER_ROLE } from "../../constants";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string ): Promise<IUser & Document>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;