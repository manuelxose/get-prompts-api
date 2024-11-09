// src/domain/repositories/TokenRepository.ts

import { RefreshTokenDTO } from "../dtos/token";

export abstract class TokenRepository {
  abstract addRefreshToken(refreshToken: RefreshTokenDTO): Promise<void>;
  abstract removeRefreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<void>;
  abstract findRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<RefreshTokenDTO | null>;
}
