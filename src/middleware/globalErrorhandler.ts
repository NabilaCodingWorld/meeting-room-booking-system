import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";
import { handelDuplicateError } from "../errors/handelDuplicateError";
import AppError from "../errors/AppError";

const globalErrorhandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: any = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  let stack;

  // checking zod error
  if (error instanceof ZodError) {
    const formattedZodError = handleZodError(error);
    statusCode = 400;
    (message = formattedZodError.message),
      (errorSources = formattedZodError.errorMessages);
    stack = error.stack;
  } else if (error?.code === 11000) {
    const formattedCastError = handelDuplicateError(error);
    statusCode = 400;
    (message = formattedCastError.message),
      (errorSources = formattedCastError.errorMessages);
    stack = error.stack;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = null;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: stack,
  });
};

export default globalErrorhandler;
