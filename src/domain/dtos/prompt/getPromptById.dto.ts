export class GetPromptByIdDTO {
  id!: string;

  static create(
    data: Partial<GetPromptByIdDTO>
  ): [string | null, GetPromptByIdDTO | null] {
    const dto = new GetPromptByIdDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.id) {
      errors.push("Prompt ID is required");
    } else if (typeof dto.id !== "string") {
      errors.push("Prompt ID must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
