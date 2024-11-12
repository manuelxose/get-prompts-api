// src/application/use-cases/auth/GenerateToken.ts

import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { GetActiveUserDTO } from "../../../domain/dtos/auth";
import { GenerateTokenDTO } from "../../../domain/dtos/token";
import { CustomError } from "../../../domain/errors";
import { AuthRepository } from "../../../domain/repositories";
import { GenerateTokenResponse } from "../../interfaces/auth/GenerateTokenResponse";

export class GenerateToken {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: JwtAdapter
  ) {}

  async execute(
    generateTokenDTO: GenerateTokenDTO
  ): Promise<GenerateTokenResponse> {
    try {
      console.log("Generación de token para usuario: ", generateTokenDTO);

      const [error, getActiveUserDTO] = GetActiveUserDTO.create({
        id: generateTokenDTO.userId,
      });

      // Verificar si el usuario existe
      const user = await this.authRepository.getActiveUser(getActiveUserDTO!);
      if (!user) {
        throw CustomError.notFound(
          `Usuario con ID ${generateTokenDTO.userId} no encontrado.`
        );
      }

      // Generar nuevo token
      const token = this.tokenService.generateAccessToken(user.id);

      console.log("Token generado correctamente: ", token);

      return {
        success: true,
        message: "Token generado exitosamente.",
        token,
      };
    } catch (error: any) {
      console.error("Error al generar token: ", error);
      return {
        success: false,
        message: error.message || "Error al generar token.",
      };
    }
  }
}
