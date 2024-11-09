// src/infrastructure/models/RefreshTokenModel.ts

export class RefreshTokenModel {
  readonly token: string;
  readonly userId: string; // Referencia al ID de usuario
  readonly expiresAt: Date;
  readonly createdAt: Date;

  constructor(
    token: string,
    userId: string,
    expiresAt: Date,
    createdAt: Date = new Date()
  ) {
    this.token = token;
    this.userId = userId;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
  }

  /**
   * Verifica si el token ha expirado.
   * @returns {boolean} True si el token ha expirado, false en caso contrario.
   */
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
