import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errorResponse } from "@/helper/response";

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = err.message || "Internal Server Error";
  let errorMessages = [{ path: "", message }];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errorMessages = Object.values(err.errors).map((el: any) => ({
      path: el.path,
      message: el.message,
    }));
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Cast Error";
    errorMessages = [{ path: err.path, message: "Invalid ID format" }];
  } else if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate Entry";
    errorMessages = [{ path: "", message: err.message }];
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorMessages = err.errors.map((error: any) => ({
      path: error.path.join("."),
      message: error.message,
    }));
  }

  return errorResponse(res, {
    statusCode,
    message,
    payload: { errorMessages, stack: err.stack },
  });
};

export default errorMiddleware;
