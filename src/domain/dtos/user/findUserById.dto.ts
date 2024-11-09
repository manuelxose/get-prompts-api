export class FindUserByIdDTO {
  id!: string;

  static create(
    data: Partial<FindUserByIdDTO>
  ): [string | null, FindUserByIdDTO | null] {
    const dto = new FindUserByIdDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.id) {
      errors.push("User ID is required");
    } else if (typeof dto.id !== "string") {
      errors.push("User ID must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
