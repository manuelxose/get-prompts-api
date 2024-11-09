// src/infrastructure/mappers/token.mapper.ts

import { RefreshTokenDTO } from "../../domain/dtos/token/RefreshTokenDTO";
import { IRefreshToken } from "../../data/mongodb/models";

export class TokenMapper {
  /**
   * Convertir un documento de Mongoose a un DTO de dominio.
   * @param tokenDoc Documento de Mongoose.
   * @returns DTO del token de refresco.
   */
  static toDTO(tokenDoc: IRefreshToken): RefreshTokenDTO {
    return new RefreshTokenDTO(
      tokenDoc.id as string,
      tokenDoc.token,
      tokenDoc.expiresAt
    );
  }

  /**
   * Convertir un DTO de dominio a un objeto plano para Mongoose.
   * @param dto DTO del token de refresco.
   * @returns Objeto plano para Mongoose.
   */
  static toDocument(dto: RefreshTokenDTO): Partial<IRefreshToken> {
    return {
      id: dto.userId,
      token: dto.token,
      expiresAt: dto.expiresAt,
    };
  }
}
