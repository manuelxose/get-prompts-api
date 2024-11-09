// src/domain/dtos/auth/AuthenticateUserWithProviderDTO.ts

import { Validators } from "../../../shared/validators";
import { AuthMethod } from "../../enums";

export class AuthenticateUserWithProviderDTO {
  method!: AuthMethod; // GOOGLE, APPLE, etc.
  providerId!: string; // ID proporcionado por el proveedor
  email!: string;
  displayName!: string;
  photoURL!: string;
  phoneNumber!: string;

  static create(
    data: Partial<AuthenticateUserWithProviderDTO>
  ): [string | null, AuthenticateUserWithProviderDTO | null] {
    const dto = new AuthenticateUserWithProviderDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidMethod(dto.method)) {
      errors.push("Método de autenticación es requerido y debe ser válido.");
    }

    if (!Validators.isValidString(dto.providerId)) {
      errors.push("Provider ID es requerido y debe ser válido.");
    }

    if (!Validators.isValidEmail(dto.email)) {
      errors.push("Email es requerido y debe ser válido.");
    }

    if (!Validators.isValidString(dto.displayName)) {
      errors.push("Nombre para mostrar es requerido y debe ser válido.");
    }

    if (!Validators.isValidString(dto.photoURL)) {
      errors.push("photoURL es requerido y debe ser válido.");
    }

    if (!Validators.isValidString(dto.phoneNumber)) {
      errors.push("Número de teléfono es requerido y debe ser válido.");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
