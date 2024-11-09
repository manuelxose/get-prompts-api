// src/utils/asyncHandler.ts

import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response>
) => {
  const handler: RequestHandler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return handler;
};
