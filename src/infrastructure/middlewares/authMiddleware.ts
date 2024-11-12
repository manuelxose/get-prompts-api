// src/core/middleware/authenticate.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories";
import { CustomError } from "../../domain/errors";
import { env } from "../../core/config/env";

export const authenticate = (userRepository: UserRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw CustomError.unauthorized("Token de acceso faltante o inválido");
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, env.jwtAccessSecret) as {
        userId: string;
        iat: number;
        exp: number;
      };

      // Opcional: Cargar el perfil del usuario
      const user = await userRepository.findById({ id: decoded.userId });

      if (!user) {
        throw CustomError.notFound("Usuario no encontrado");
      }

      // Adjuntar el userId y el perfil del usuario al objeto req
      (req as any).userId = decoded.userId;
      (req as any).user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};
