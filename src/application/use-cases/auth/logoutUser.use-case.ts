// src/application/use-cases/auth/LogoutUser.ts

import { LogoutUserDTO } from "../../../domain/dtos/auth";
import { CustomError } from "../../../domain/errors";
import { AuthRepository, TokenRepository } from "../../../domain/repositories";
import { LogoutUserResponse } from "../../interfaces/auth/LogoutUserResponse";

export class LogoutUser {
  constructor(private tokenRepository: TokenRepository) {}

  /**
   * Cierra sesión de un usuario.
   * @param logoutUserDTO - DTO que contiene los detalles de cierre de sesión.
   * @returns Promise<LogoutUserResponse> - Respuesta del cierre de sesión.
   * @throws CustomError si ocurre un error durante el cierre de sesión.
   */
  async execute(logoutUserDTO: LogoutUserDTO): Promise<LogoutUserResponse> {
    try {
      const { userId, refreshToken } = logoutUserDTO;

      // Validar el refresh token
      const existingToken = await this.tokenRepository.findRefreshToken(
        userId,
        refreshToken
      );
      if (!existingToken) {
        throw CustomError.unauthorized(
          "Token de refresco inválido o ya expirado."
        );
      }

      // Eliminar el refresh token
      await this.tokenRepository.removeRefreshToken(existingToken!);

      return {
        success: true,
        message: "Cierre de sesión exitoso.",
      };
    } catch (error: any) {
      console.error("Error al cerrar sesión: ", error);
      throw error; // Re-lanzar el error para ser manejado por el middleware
    }
  }
}
