export class FindUserByEmailDTO {
  email!: string;

  static create(
    data: Partial<FindUserByEmailDTO>
  ): [string | null, FindUserByEmailDTO | null] {
    const dto = new FindUserByEmailDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.email) {
      errors.push("Email is required");
    } else if (typeof dto.email !== "string") {
      errors.push("Email must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
