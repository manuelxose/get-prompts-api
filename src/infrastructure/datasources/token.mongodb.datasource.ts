// src/infrastructure/data-sources/TokenMongoDataSource.ts

import logger from "../../core/adapters/logger.adapter";
import {
  IRefreshToken,
  RefreshTokenModel,
} from "../../data/mongodb/models/token.model";
import { TokenDataSource } from "../../domain/datasources";
import { RefreshTokenDTO } from "../../domain/dtos/token";
import { CustomError } from "../../domain/errors";
import { TokenMapper } from "../mappers";

class TokenMongoDataSource implements TokenDataSource {
  /**
   * Añade un nuevo token de refresco.
   * @param refreshToken - DTO del token de refresco.
   * @returns Promise<void>
   * @throws CustomError si el token ya existe o ocurre un error.
   */
  async addRefreshToken(refreshToken: RefreshTokenDTO): Promise<void> {
    logger.info(
      `Añadiendo token de refresco para el usuario ${refreshToken.userId}`
    );

    try {
      const tokenDoc = new RefreshTokenModel(
        TokenMapper.toDocument(refreshToken)
      );
      await tokenDoc.save();
      logger.info(
        `Token de refresco ${refreshToken.token} añadido para el usuario ${refreshToken.userId}`
      );
    } catch (error: any) {
      logger.error(`Error al añadir token de refresco: ${error.message}`);
      if (error.code === 11000) {
        // Error de clave duplicada
        throw CustomError.badRequest("El token de refresco ya existe");
      }
      throw CustomError.internal(
        "Ocurrió un error al añadir el token de refresco"
      );
    }
  }

  /**
   * Elimina un token de refresco existente.
   * @param refreshTokenDTO - DTO del token de refresco a eliminar.
   * @returns Promise<void>
   * @throws CustomError si el token no es encontrado o ocurre un error.
   */
  async removeRefreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<void> {
    logger.info(
      `Eliminando token de refresco ${refreshTokenDTO.token} para el usuario ${refreshTokenDTO.userId}`
    );

    try {
      const result = await RefreshTokenModel.findOneAndDelete({
        userId: refreshTokenDTO.userId,
        token: refreshTokenDTO.token,
      });

      if (!result) {
        throw CustomError.notFound("Token de refresco no encontrado");
      }

      logger.info(
        `Token de refresco ${refreshTokenDTO.token} eliminado para el usuario ${refreshTokenDTO.userId}`
      );
    } catch (error: unknown) {
      logger.error(`Error al eliminar token de refresco: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal(
          "Ocurrió un error al eliminar el token de refresco"
        );
      }
    }
  }

  /**
   * Encuentra un token de refresco específico.
   * @param userId - ID del usuario.
   * @param refreshToken - Token de refresco.
   * @returns Promise<RefreshTokenDTO | null> - DTO del token de refresco si existe, o null.
   */
  async findRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<RefreshTokenDTO | null> {
    logger.info(
      `Buscando token de refresco ${refreshToken} para el usuario ${userId}`
    );

    try {
      const tokenDoc: IRefreshToken | null = await RefreshTokenModel.findOne({
        userId,
        token: refreshToken,
      });

      if (!tokenDoc) {
        logger.warn(
          `Token de refresco ${refreshToken} no encontrado para el usuario ${userId}`
        );
        return null;
      }

      return TokenMapper.toDTO(tokenDoc);
    } catch (error: unknown) {
      logger.error(`Error al buscar token de refresco: ${error}`);
      throw CustomError.internal(
        "Ocurrió un error al buscar el token de refresco"
      );
    }
  }
}

export { TokenMongoDataSource as TokenDataSource };
