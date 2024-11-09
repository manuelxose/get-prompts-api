// src/domain/dtos/auth/ValidateTokenDTO.ts

import { Validators } from "../../../shared/validators";

export class ValidateTokenDTO {
  token!: string;

  static create(
    data: Partial<ValidateTokenDTO>
  ): [string | null, ValidateTokenDTO | null] {
    const dto = new ValidateTokenDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.token)) {
      errors.push("Token es requerido y debe ser válido.");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
