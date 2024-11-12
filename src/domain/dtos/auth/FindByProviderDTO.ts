// src/domain/dtos/auth/FindByProviderIdDTO.ts

import { AuthMethod } from "../../enums";

export class FindByProviderIdDTO {
  providerId: string;
  method: AuthMethod;

  constructor(providerId: string, method: AuthMethod) {
    this.providerId = providerId;
    this.method = method;
  }

  /**
   * Método estático para crear una instancia del DTO con validaciones.
   * @param data Objeto que contiene providerId y method.
   * @returns Tupla con un posible mensaje de error y la instancia del DTO.
   */
  static create(data: {
    providerId: string;
    method: AuthMethod;
  }): [string | null, FindByProviderIdDTO | null] {
    const errors: string[] = [];

    if (!data.providerId || data.providerId.trim() === "") {
      errors.push("El providerId es requerido.");
    }

    if (!data.method) {
      errors.push("El método de autenticación es requerido.");
    } else if (!Object.values(AuthMethod).includes(data.method)) {
      errors.push("El método de autenticación es inválido.");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, new FindByProviderIdDTO(data.providerId, data.method)];
  }
}
