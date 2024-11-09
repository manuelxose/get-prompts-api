// src/infrastructure/repositories/TokenRepositoryImpl.ts

import { RefreshTokenDTO } from "../../domain/dtos/token/RefreshTokenDTO";
import { TokenRepository } from "../../domain/repositories";
import { TokenDataSource } from "../datasources";

export class TokenRepositoryImpl implements TokenRepository {
  constructor(private tokenDataSource: TokenDataSource) {}

  /**
   * Añadir un nuevo token de refresco.
   * @param refreshToken DTO del token de refresco.
   */
  async addRefreshToken(refreshToken: RefreshTokenDTO): Promise<void> {
    return this.tokenDataSource.addRefreshToken(refreshToken);
  }

  /**
   * Remover un token de refresco existente.
   * @param refreshTokenDTO DTO del token de refresco a remover.
   */
  async removeRefreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<void> {
    return this.tokenDataSource.removeRefreshToken(refreshTokenDTO);
  }

  /**
   * Encontrar un token de refresco específico.
   * @param userId ID del usuario.
   * @param refreshToken Token de refresco.
   * @returns El DTO del token de refresco si existe, o null.
   */
  async findRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<RefreshTokenDTO | null> {
    return this.tokenDataSource.findRefreshToken(userId, refreshToken);
  }
}

export { TokenRepositoryImpl as TokenRepository };
