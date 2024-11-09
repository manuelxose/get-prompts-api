// src/infrastructure/mappers/AuthMapper.ts

import { IAuth } from "../../data/mongodb/models";
import { AuthEntity, RefreshToken } from "../../domain/entities/auth";

export class AuthMapper {
  static toEntity(auth: IAuth): AuthEntity {
    const refreshTokens = auth.refreshTokens.map(
      (token) => new RefreshToken(token.token, token.expiresAt, token.createdAt)
    );

    return new AuthEntity(
      auth.id,
      auth.userId,
      auth.method,
      auth.emailVerified,
      auth.createdAt,
      auth.updatedAt,
      auth.password,
      auth.providerId,
      auth.email,
      refreshTokens
    );
  }
}
