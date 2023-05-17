import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiError from "../errors/ApiError";

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return ApiError.validationError(res, { message:"Error has been detected",friendlyMsg: errors[0] });
  }

  next();
}

export = handleValidationErrors;
