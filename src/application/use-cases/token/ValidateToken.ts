// src/application/use-cases/auth/ValidateToken.ts

import { AuthRepository } from "../../../domain/interfaces";
import { ValidateTokenDTO } from "../../../domain/dtos/auth/ValidateTokenDTO";
import { ValidateTokenResponse } from "../../interfaces/responses/auth/ValidateTokenResponse";
import { CustomError } from "../../../domain/errors";
import { TokenService } from "../../../services/TokenService";

export class ValidateToken {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) {}

  async execute(
    validateTokenDTO: ValidateTokenDTO
  ): Promise<ValidateTokenResponse> {
    try {
      console.log("Validación de token: ", validateTokenDTO);

      // Validar el token JWT
      const userId = this.tokenService.validateToken(validateTokenDTO.token);
      if (!userId) {
        throw CustomError.unauthorized("Token inválido.");
      }

      // Verificar si el usuario existe
      const user = await this.authRepository.getUserById(userId);
      if (!user) {
        throw CustomError.notFound(`Usuario con ID ${userId} no encontrado.`);
      }

      console.log("Token válido para usuario: ", user);

      return {
        success: true,
        message: "Token válido.",
        userId,
      };
    } catch (error: any) {
      console.error("Error al validar token: ", error);
      return {
        success: false,
        message: error.message || "Error al validar token.",
      };
    }
  }
}
