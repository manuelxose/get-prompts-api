export class UpdatePasswordDTO {
  userId!: string;
  currentPassword!: string;
  newPassword!: string;

  static create(
    data: Partial<UpdatePasswordDTO>
  ): [string | null, UpdatePasswordDTO | null] {
    const dto = new UpdatePasswordDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.userId) {
      errors.push("User ID is required");
    } else if (typeof dto.userId !== "string") {
      errors.push("User ID must be a string");
    }

    if (!dto.currentPassword) {
      errors.push("Current password is required");
    } else if (typeof dto.currentPassword !== "string") {
      errors.push("Current password must be a string");
    }

    if (!dto.newPassword) {
      errors.push("New password is required");
    } else if (typeof dto.newPassword !== "string") {
      errors.push("New password must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
