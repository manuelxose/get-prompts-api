export class DeleteUserDTO {
  userId!: string;

  static create(
    data: Partial<DeleteUserDTO>
  ): [string | null, DeleteUserDTO | null] {
    const dto = new DeleteUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.userId) {
      errors.push("User ID is required");
    } else if (typeof dto.userId !== "string") {
      errors.push("User ID must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
