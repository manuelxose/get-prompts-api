// src/domain/dtos/auth/RegisterUserDTO.ts

import { Validators } from "../../../shared/validators";
import { AuthMethod, UserRole } from "../../enums";

export class RegisterUserDTO {
  id!: string; // UUID generado externamente
  email!: string;
  password!: string;
  displayName!: string;
  phoneNumber!: string;
  isSeller!: boolean;
  promptsPublished!: string[];
  paymentMethods!: string[];
  promptsBought!: string[];
  role!: UserRole;
  nickName?: string;
  stripeId?: string;
  photoURL!: string;

  // Campos adicionales para AuthEntity
  method!: AuthMethod; // Por ejemplo, AuthMethod.EMAIL
  emailVerified!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  providerId?: string;

  /**
   * Método estático para crear una instancia de RegisterUserDTO con validaciones.
   * @param data Datos parciales para el registro del usuario.
   * @returns Un arreglo con un posible mensaje de error y la instancia de RegisterUserDTO.
   */
  static create(
    data: Partial<RegisterUserDTO>
  ): [string | null, RegisterUserDTO | null] {
    const dto = new RegisterUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    // Validaciones de campos principales
    if (!Validators.isValidEmail(dto.email)) {
      errors.push("Email es requerido y debe ser válido.");
    }

    if (!Validators.isValidPassword(dto.password)) {
      errors.push(
        "Contraseña es requerida y debe cumplir con los criterios de seguridad."
      );
    }

    if (!Validators.isValidString(dto.displayName)) {
      errors.push(
        "Nombre para mostrar es requerido y debe ser una cadena válida."
      );
    }

    if (!Validators.isValidString(dto.phoneNumber)) {
      errors.push("Número de teléfono es requerido y debe ser válido.");
    }

    if (!Validators.isValidBoolean(dto.isSeller)) {
      errors.push("Campo 'isSeller' es requerido y debe ser booleano.");
    }

    if (!Array.isArray(dto.promptsPublished)) {
      errors.push("promptsPublished debe ser un array.");
    }

    if (!Array.isArray(dto.paymentMethods)) {
      errors.push("paymentMethods debe ser un array.");
    }

    if (!Array.isArray(dto.promptsBought)) {
      errors.push("promptsBought debe ser un array.");
    }

    if (!Validators.isValidRole(dto.role)) {
      errors.push("Rol es requerido y debe ser válido.");
    }

    // Validaciones de campos adicionales para AuthEntity
    if (!Validators.isValidUUID(dto.id)) {
      errors.push("ID es requerido y debe ser un UUID válido.");
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
