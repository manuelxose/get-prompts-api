export class ResetPasswordDTO {
  email!: string;
  password!: string;

  static create(
    data: Partial<ResetPasswordDTO>
  ): [string | null, ResetPasswordDTO | null] {
    const dto = new ResetPasswordDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.email) {
      errors.push("Email is required");
    } else if (typeof dto.email !== "string") {
      errors.push("Email must be a string");
    }

    if (!dto.password) {
      errors.push("Password is required");
    } else if (typeof dto.password !== "string") {
      errors.push("Password must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
