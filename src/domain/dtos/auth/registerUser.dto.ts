// src/domain/dtos/auth/RegisterUserDTO.ts

import { Validators } from "../../../shared/validators";
import { AuthMethod, UserRole } from "../../enums";

export class RegisterUserDTO {
  // Campos para AuthEntity
  id!: string; // ID de Auth (UUID generado externamente)
  userId!: string; // ID de User (UUID generado externamente)
  email!: string;
  password!: string; // Contraseña en texto plano
  method!: AuthMethod; // Por ejemplo, AuthMethod.EMAIL
  emailVerified!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  providerId?: string;

  // Otros campos opcionales de UserEntity
  // Puedes añadir más campos si son necesarios

  // Campo adicional para la contraseña hasheada (opcional)
  hashedPassword?: string;

  static create(
    data: Partial<RegisterUserDTO>
  ): [string | null, RegisterUserDTO | null] {
    const dto = new RegisterUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    // Validaciones de campos principales
    if (!Validators.isValidUUID(dto.id)) {
      errors.push("ID es requerido y debe ser un UUID válido.");
    }

    if (!Validators.isValidUUID(dto.userId)) {
      errors.push("userId es requerido y debe ser un UUID válido.");
    }

    if (!Validators.isValidEmail(dto.email)) {
      errors.push("Email es requerido y debe ser válido.");
    }
    //Solo comprobar contraseña si el metodo de autenticación es Email
    if (dto.method === AuthMethod.EMAIL) {
      if (!dto.password) {
        errors.push("Contraseña es requerida.");
      }
      if (!Validators.isValidPassword(dto.password)) {
        errors.push(
          "Contraseña es requerida y debe cumplir con los criterios de seguridad."
        );
      }
    }

    if (!Validators.isValidAuthMethod(dto.method)) {
      errors.push("Método de autenticación es requerido y debe ser válido.");
    }

    if (typeof dto.emailVerified !== "boolean") {
      errors.push("emailVerified debe ser un valor booleano.");
    }

    if (!Validators.isValidDate(dto.createdAt)) {
      errors.push("createdAt es requerido y debe ser una fecha válida.");
    }

    if (!Validators.isValidDate(dto.updatedAt)) {
      errors.push("updatedAt es requerido y debe ser una fecha válida.");
    }

    // Validaciones opcionales
    if (dto.providerId && !Validators.isValidString(dto.providerId)) {
      errors.push("providerId debe ser una cadena válida si se proporciona.");
    }

    // Añade más validaciones según sea necesario

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
