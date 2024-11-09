// src/domain/dtos/auth/LogoutUserDTO.ts

import { Validators } from "../../../shared/validators";

export class LogoutUserDTO {
  userId!: string;
  refreshToken!: string;

  static create(
    data: Partial<LogoutUserDTO>
  ): [string | null, LogoutUserDTO | null] {
    const dto = new LogoutUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidUUID(dto.userId)) {
      errors.push("userId es requerido y debe ser un UUID válido.");
    }

    if (!Validators.isValidString(dto.refreshToken)) {
      errors.push("refreshToken es requerido y debe ser válido.");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
