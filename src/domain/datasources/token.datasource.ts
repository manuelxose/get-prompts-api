// src/domain/datasources/TokenDataSource.ts

import { RefreshTokenDTO } from "../dtos/token/RefreshTokenDTO";

export abstract class TokenDataSource {
  /**
   * Añadir un nuevo token de refresco.
   * @param refreshToken DTO del token de refresco.
   */
  abstract addRefreshToken(refreshToken: RefreshTokenDTO): Promise<void>;

  /**
   * Remover un token de refresco existente.
   * @param refreshTokenDTO DTO del token de refresco a remover.
   */
  abstract removeRefreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<void>;

  /**
   * Encontrar un token de refresco específico.
   * @param userId ID del usuario.
   * @param refreshToken Token de refresco.
   * @returns El DTO del token de refresco si existe, o null.
   */
  abstract findRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<RefreshTokenDTO | null>;
}
