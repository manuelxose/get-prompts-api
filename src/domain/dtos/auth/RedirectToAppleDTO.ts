export class RedirectToAppleDTO {
  readonly state: string;

  constructor(state: string) {
    this.state = state;
  }

  static create(
    data: Partial<RedirectToAppleDTO>
  ): [string | null, RedirectToAppleDTO | null] {
    const dto = new RedirectToAppleDTO(data.state!);
    const errors: string[] = [];

    if (!dto.state) {
      errors.push("State is required");
    } else if (typeof dto.state !== "string") {
      errors.push("State must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
