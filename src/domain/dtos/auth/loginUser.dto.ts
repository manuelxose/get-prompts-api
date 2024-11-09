// src/domain/dtos/userAuth/LoginUserDTO.ts

import e from "express";
import { Validators } from "../../../shared/validators";

export class LoginUserDTO {
  email!: string;
  password!: string;

  static create(
    data: Partial<LoginUserDTO>
  ): [string | null, LoginUserDTO | null] {
    const dto = new LoginUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.email) {
      errors.push("Email is required");
    } else if (!Validators.isValidEmail(dto.email)) {
      // Ajustar si hay un validador específico para emails
      errors.push("Invalid email format");
    }

    if (!dto.password) {
      errors.push("Password is required");
    } else if (!Validators.isValidPassword(dto.password)) {
      errors.push("Invalid password format");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
