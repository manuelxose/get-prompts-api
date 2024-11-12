// src/infrastructure/models/RefreshTokenModel.ts

import { TokenType } from "../../enums";

export class RefreshTokenModel {
  readonly id: string;
  readonly userId: string;
  readonly token: string;
  readonly type: TokenType;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: RefreshTokenModel) {
    this.id = props.id || this.generateUUID();
    this.userId = props.userId;
    this.token = props.token;
    this.type = props.type;
    this.expiresAt = props.expiresAt || new Date();
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  private generateUUID(): string {
    // Implementa la lógica para generar un UUID, por ejemplo, usando la librería 'uuid'
    // Aquí utilizamos un placeholder
    return "generated-token-uuid";
  }

  static create(props: Partial<RefreshTokenModel>): RefreshTokenModel {
    if (!props.userId || !props.token || !props.type) {
      throw new Error("Missing required properties for TokenEntity");
    }
    return new RefreshTokenModel(props as RefreshTokenModel);
  }
  /**
   * Verifica si el token ha expirado.
   * @returns {boolean} True si el token ha expirado, false en caso contrario.
   */
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
