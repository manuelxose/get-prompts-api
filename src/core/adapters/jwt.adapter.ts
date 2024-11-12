// src/adapters/JwtAdapter.ts

import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export class JwtAdapter {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenOptions: SignOptions;
  private readonly refreshTokenOptions: SignOptions;

  constructor(
    accessTokenSecret: string = env.jwtAccessSecret,
    refreshTokenSecret: string = env.jwtRefreshSecret,
    accessTokenExpiresIn: string = "15m",
    refreshTokenExpiresIn: string = "7d"
  ) {
    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new Error("Se deben proporcionar claves secretas para los JWT");
    }
    this.accessTokenSecret = accessTokenSecret;
    this.refreshTokenSecret = refreshTokenSecret;
    this.accessTokenOptions = {
      expiresIn: accessTokenExpiresIn,
      algorithm: "HS256",
    };
    this.refreshTokenOptions = {
      expiresIn: refreshTokenExpiresIn,
      algorithm: "HS256",
    };
  }

  generateAccessToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.accessTokenSecret,
      this.accessTokenOptions
    );
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.refreshTokenSecret,
      this.refreshTokenOptions
    );
  }

  verifyAccessToken(token: string): JwtPayload & { userId: string } {
    return jwt.verify(token, this.accessTokenSecret) as JwtPayload & {
      userId: string;
    };
  }

  verifyRefreshToken(token: string): JwtPayload & { userId: string } {
    return jwt.verify(token, this.refreshTokenSecret) as JwtPayload & {
      userId: string;
    };
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
