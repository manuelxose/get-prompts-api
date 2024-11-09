export class GetActiveUserDTO {
  id!: string;

  static create(
    data: Partial<GetActiveUserDTO>
  ): [string | null, GetActiveUserDTO | null] {
    const dto = new GetActiveUserDTO();
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
