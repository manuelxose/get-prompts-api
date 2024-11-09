// src/adapters/JwtAdapter.ts
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export class JwtAdapter {
  private readonly secret: string;
  private readonly accessTokenOptions: SignOptions;
  private readonly refreshTokenOptions: SignOptions;

  /**
   * @param secret La clave secreta para firmar y verificar JWT.
   * @param accessTokenExpiresIn Tiempo de expiración del access token.
   * @param refreshTokenExpiresIn Tiempo de expiración del refresh token.
   */
  constructor(
    secret: string = env.jwtSecret,
    accessTokenExpiresIn: string = "15m",
    refreshTokenExpiresIn: string = "7d"
  ) {
    if (!secret) {
      throw new Error("Secret key must be provided for JWT");
    }
    this.secret = secret;
    this.accessTokenOptions = {
      expiresIn: accessTokenExpiresIn,
      algorithm: "HS256",
    };
    this.refreshTokenOptions = {
      expiresIn: refreshTokenExpiresIn,
      algorithm: "HS256",
    };
  }

  /**
   * Genera un access token para el usuario.
   * @param userId ID del usuario para incluir en el payload.
   * @returns Token JWT de acceso firmado.
   */
  generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, this.accessTokenOptions);
  }

  /**
   * Genera un refresh token sin payload de usuario.
   * @returns Token JWT de refresco firmado.
   */
  generateRefreshToken(): string {
    return jwt.sign({}, this.secret, this.refreshTokenOptions);
  }

  /**
   * Valida un access token y devuelve el ID de usuario si es válido.
   * @param token El token JWT de acceso a validar.
   * @returns El ID de usuario si el token es válido; null si no lo es.
   */
  validateAccessToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload & {
        userId: string;
      };
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }

  /**
   * Valida un refresh token.
   * @param token El token JWT de refresco a validar.
   * @returns True si el token es válido; false si no lo es.
   */
  validateRefreshToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Decodifica un token JWT sin verificarlo.
   * @param token El token JWT a decodificar.
   * @returns El payload decodificado o null si el token es inválido.
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
