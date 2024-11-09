export class GenerateTokenDTO {
  userId!: string;

  static create(
    data: Partial<GenerateTokenDTO>
  ): [string | null, GenerateTokenDTO | null] {
    const dto = new GenerateTokenDTO();
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
