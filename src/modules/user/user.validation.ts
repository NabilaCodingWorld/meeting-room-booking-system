import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    address: z.string().min(1, "Address is required"),
    role: z.enum(["user", "admin"]),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema
};
