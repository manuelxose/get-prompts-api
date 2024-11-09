// src/infrastructure/data-sources/TokenMongoDataSource.ts

import logger from "../../core/adapters/logger.adapter";
import { IRefreshToken } from "../../data/mongodb/models";
import { RefreshTokenModel } from "../../data/mongodb/models/token.model";
import { TokenDataSource } from "../../domain/datasources";
import { RefreshTokenDTO } from "../../domain/dtos/token";
import { CustomError } from "../../domain/errors";
import { TokenMapper } from "../mappers";

class TokenMongoDataSource implements TokenDataSource {
  /**
   * Añadir un nuevo token de refresco.
   * @param refreshToken DTO del token de refresco.
   */
  async addRefreshToken(refreshToken: RefreshTokenDTO): Promise<void> {
    logger.info(
      `TokenMongoDataSource: Adding refresh token for user ${refreshToken.userId}`
    );

    try {
      const tokenDoc = new RefreshTokenModel(
        TokenMapper.toDocument(refreshToken)
      );
      await tokenDoc.save();
      logger.info(
        `TokenMongoDataSource: Added refresh token ${refreshToken.token} for user ${refreshToken.userId}`
      );
    } catch (error: any) {
      logger.error(`TokenMongoDataSource.addRefreshToken: ${error.message}`);
      if (error.code === 11000) {
        // Error de clave duplicada
        throw CustomError.badRequest("Refresh token already exists");
      }
      throw CustomError.internal(
        "An error occurred while adding the refresh token"
      );
    }
  }

  /**
   * Remover un token de refresco existente.
   * @param refreshTokenDTO DTO del token de refresco a remover.
   */
  async removeRefreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<void> {
    logger.info(
      `TokenMongoDataSource: Removing refresh token ${refreshTokenDTO.token} for user ${refreshTokenDTO.userId}`
    );

    try {
      const result = await RefreshTokenModel.findOneAndDelete({
        userId: refreshTokenDTO.userId,
        token: refreshTokenDTO.token,
      });

      if (!result) {
        throw CustomError.notFound("Refresh token not found");
      }

      logger.info(
        `TokenMongoDataSource: Removed refresh token ${refreshTokenDTO.token} for user ${refreshTokenDTO.userId}`
      );
    } catch (error: unknown) {
      logger.error(`TokenMongoDataSource.removeRefreshToken: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal(
          "An error occurred while removing the refresh token"
        );
      }
    }
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
    logger.info(
      `TokenMongoDataSource: Finding refresh token ${refreshToken} for user ${userId}`
    );

    try {
      const tokenDoc: IRefreshToken | null = await RefreshTokenModel.findOne({
        userId,
        token: refreshToken,
      });

      if (!tokenDoc) {
        logger.warn(
          `TokenMongoDataSource: Refresh token ${refreshToken} not found for user ${userId}`
        );
        return null;
      }

      return TokenMapper.toDTO(tokenDoc);
    } catch (error: unknown) {
      logger.error(`TokenMongoDataSource.findRefreshToken: ${error}`);
      throw CustomError.internal(
        "An error occurred while finding the refresh token"
      );
    }
  }
}

export { TokenMongoDataSource as TokenDataSource };
