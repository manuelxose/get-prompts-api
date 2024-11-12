// src/domain/dtos/token/RefreshTokenDTO.ts

import { Validators } from "../../../shared/validators";
import { TokenType } from "../../enums";

export class RefreshTokenDTO {
  userId: string;
  token: string;
  type: TokenType;
  expiresAt: Date;
  createdAt?: Date;

  constructor(
    userId: string,
    token: string,
    type: TokenType,
    expiresAt: Date,
    createdAt?: Date
  ) {
    this.userId = userId;
    this.token = token;
    this.type = type || TokenType.REFRESH;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
  }

  /**
   * Método estático para crear una instancia de RefreshTokenDTO con validaciones.
   * @param data Datos parciales para el token de refresco.
   * @returns Un arreglo con un posible mensaje de error y la instancia de RefreshTokenDTO.
   */
  static create(
    data: Partial<RefreshTokenDTO>
  ): [string | null, RefreshTokenDTO | null] {
    const dto = new RefreshTokenDTO(
      data.userId!,
      data.token!,
      data.type!,
      data.expiresAt!
    );
    const errors: string[] = [];

    // Validaciones
    if (!Validators.isValidUUID(dto.userId)) {
      errors.push("userId es requerido y debe ser un UUID válido.");
    }

    if (!Validators.isValidString(dto.token)) {
      errors.push("token es requerido y debe ser una cadena válida.");
    }

    if (!Validators.isValidDate(dto.expiresAt)) {
      errors.push("expiresAt es requerido y debe ser una fecha válida.");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
