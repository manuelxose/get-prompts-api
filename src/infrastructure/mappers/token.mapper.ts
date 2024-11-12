// src/infrastructure/mappers/token.mapper.ts

import { IRefreshToken } from "../../data/mongodb/models/token.model";
import { RefreshTokenDTO } from "../../domain/dtos/token/RefreshTokenDTO";

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
      tokenDoc.type,
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
      userId: dto.userId,
      token: dto.token,
      type: dto.type,
      expiresAt: dto.expiresAt,
    };
  }
}
