// src/application/use-cases/auth/LogoutUser.ts

import { LogoutUserDTO } from "../../../domain/dtos/auth";
import { CustomError } from "../../../domain/errors/";
import { AuthRepository, TokenRepository } from "../../../domain/repositories";
import { LogoutUserResponse } from "../../interfaces/auth/LogoutUserResponse";

export class LogoutUser {
  constructor(
    private authRepository: AuthRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute(logoutUserDTO: LogoutUserDTO): Promise<LogoutUserResponse> {
    try {
      console.log("Cierre de sesión de usuario: ", logoutUserDTO);

      const { userId, refreshToken } = logoutUserDTO;

      // Validar el refresh token
      const existingToken = await this.tokenRepository.findRefreshToken(
        userId,
        refreshToken
      );
      if (!existingToken) {
        throw CustomError.unauthorized("Refresh token inválido o ya expirado.");
      }

      // Eliminar el refresh token
      await this.tokenRepository.removeRefreshToken(existingToken!);

      console.log("Usuario cerró sesión correctamente: ", userId);

      return {
        success: true,
        message: "Cierre de sesión exitoso.",
      };
    } catch (error: any) {
      console.error("Error al cerrar sesión: ", error);
      return {
        success: false,
        message: error.message || "Error al cerrar sesión.",
      };
    }
  }
}
