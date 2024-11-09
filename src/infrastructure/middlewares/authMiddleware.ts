// src/infrastructure/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../../domain/errors/customError";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new CustomError("Authorization header missing", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new CustomError("Token missing", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return next(new CustomError("Invalid token", 403));
    }

    const { userId, email } = decoded as { userId: string; email: string };
    (req as AuthenticatedRequest).user = { id: userId, email };
    next();
  });
};
