// src/application/use-cases/auth/RefreshTokenUseCase.ts

import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { RefreshTokenDTO } from "../../../domain/dtos/token";
import { CustomError } from "../../../domain/errors";
import { TokenRepository } from "../../../domain/repositories";
import { RefreshTokenResponse } from "../../interfaces/auth/RefreshTokenResponse";

export class RefreshTokenUseCase {
  private jwtAdapter: JwtAdapter;

  constructor(private tokenRepository: TokenRepository) {
    this.jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || "secret");
  }

  /**
   * Refresca el token de acceso utilizando el token de refresco.
   * @param refreshTokenStr - Token de refresco proporcionado por el cliente.
   * @returns Promise<RefreshTokenResponse> - Nuevo token de acceso y de refresco.
   * @throws CustomError si el token de refresco es inválido o expirado.
   */
  async execute(refreshTokenStr: string): Promise<RefreshTokenResponse> {
    try {
      // Verificar y decodificar el token de refresco
      const payload = this.jwtAdapter.verifyRefreshToken(refreshTokenStr);

      const userId = payload.userId;

      // Validar el refresh token en la base de datos
      const existingToken = await this.tokenRepository.findRefreshToken(
        userId,
        refreshTokenStr
      );
      if (!existingToken) {
        throw CustomError.unauthorized(
          "Token de refresco inválido o ya expirado."
        );
      }

      // Rotar tokens
      // Eliminar el token de refresco usado
      await this.tokenRepository.removeRefreshToken(existingToken);

      // Generar nuevos tokens
      const accessToken = this.jwtAdapter.generateAccessToken(userId);
      const newRefreshTokenStr = this.jwtAdapter.generateRefreshToken(userId);

      // Almacenar el nuevo refresh token
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

      // Desestructurar la tupla
      const [error, newRefreshTokenDTO] = RefreshTokenDTO.create({
        token: newRefreshTokenStr,
        userId,
        expiresAt,
        createdAt: new Date(),
      });

      if (error) {
        throw CustomError.badRequest(error);
      }

      // Ahora puedes pasar newRefreshTokenDTO al método que espera un RefreshTokenDTO
      await this.tokenRepository.addRefreshToken(newRefreshTokenDTO!);

      return {
        success: true,
        accessToken,
        refreshToken: newRefreshTokenStr,
      };
    } catch (error: any) {
      console.error("Error al refrescar token: ", error);
      throw error; // Re-lanzar el error para ser manejado por el middleware
    }
  }
}
