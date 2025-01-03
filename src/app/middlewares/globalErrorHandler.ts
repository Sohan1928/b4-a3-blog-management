import { ZodError } from "zod";
import config from "../config";
import AppError from "../error/AppError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import handleValidationError from "../error/handleValidationError";
import handleZodError from "../error/handleZodError";
import { TErrorSources } from "../interface/error";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //setting default values
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // response send
  res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
    err,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
