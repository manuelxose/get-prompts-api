// src/infrastructure/controllers/user.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  DeleteUserDTO,
  FindUserByIdDTO,
  UpdateUserDTO,
} from "../../domain/dtos/user";
import {
  DeleteUserProfile,
  GetUserProfileById,
  UpdateUserProfile,
} from "../../application/use-cases/user";

export class UserController {
  constructor(
    private updateUseCase: UpdateUserProfile,
    private deleteUseCase: DeleteUserProfile,
    private getUseCase: GetUserProfileById
  ) {}

  /**
   * Actualiza el perfil del usuario.
   * @param req Solicitud HTTP.
   * @param res Respuesta HTTP.
   * @param next Función para pasar al siguiente middleware.
   */

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      // Verificar que req.user esté definido
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const [error, updateDTO] = UpdateUserDTO.create(req.body);

      if (error) {
        return res.status(400).json({ message: error });
      }

      // Ejecutar el caso de uso

      const updatedUser = await this.updateUseCase.execute(updateDTO!);
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // Verificar que req.user esté definido
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const [error, deleteDTO] = DeleteUserDTO.create(req.params);

      if (error) {
        return res.status(400).json({ message: error });
      }

      // Ejecutar el caso de uso

      const deletedUser = await this.deleteUseCase.execute(deleteDTO!);
      res.status(200).json({
        message: "Profile deleted successfully",
        user: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // Verificar que req.user esté definido
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const [error, getDTO] = FindUserByIdDTO.create(req.params);

      if (error) {
        return res.status(400).json({ message: error });
      }

      // Ejecutar el caso de uso

      const getUserProfile = await this.getUseCase.execute(getDTO!);
      res.status(200).json({
        message: "Profile retrieved successfully",
        user: getUserProfile,
      });
    } catch (error) {
      next(error);
    }
  }
}
