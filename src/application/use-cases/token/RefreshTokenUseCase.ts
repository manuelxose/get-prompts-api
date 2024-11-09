// src/application/use-cases/auth/RefreshTokenUseCase.ts

import { RefreshTokenDTO } from "../../../domain/dtos/token";
import { CustomError } from "../../../domain/errors";
import { TokenRepository } from "../../../domain/repositories";

export class RefreshTokenUseCase {
  constructor(private tokenRepository: TokenRepository) {}

  /**
   * Añadir un nuevo token de refresco.
   * @param userId ID del usuario.
   * @param token Token de refresco.
   * @param expiresAt Fecha de expiración.
   */
  async executeAdd(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    const [error, refreshTokenDTO] = RefreshTokenDTO.create({
      userId,
      token,
      expiresAt,
    });
    if (error || !refreshTokenDTO) {
      throw CustomError.badRequest(
        error || "Datos de token de refresco inválidos."
      );
    }

    await this.tokenRepository.addRefreshToken(refreshTokenDTO);
  }

  /**
   * Remover un token de refresco existente.
   * @param userId ID del usuario.
   * @param token Token de refresco a remover.
   */
  async executeRemove(userId: string, token: string): Promise<void> {
    const [error, refreshTokenDTO] = RefreshTokenDTO.create({
      userId,
      token,
      expiresAt: new Date(),
    }); // expiresAt no es relevante para la eliminación
    if (error || !refreshTokenDTO) {
      throw CustomError.badRequest(
        error || "Datos de token de refresco inválidos."
      );
    }

    await this.tokenRepository.removeRefreshToken(refreshTokenDTO);
  }

  /**
   * Verificar la existencia de un token de refresco.
   * @param userId ID del usuario.
   * @param token Token de refresco a verificar.
   * @returns El DTO del token si existe, o null.
   */
  async executeFind(
    userId: string,
    token: string
  ): Promise<RefreshTokenDTO | null> {
    return this.tokenRepository.findRefreshToken(userId, token);
  }
}
