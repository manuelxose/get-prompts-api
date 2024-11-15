import crypto from "crypto";

export class RedirectToGoogleDTO {
  readonly state: string;

  constructor(state: string) {
    this.state = state;
  }

  static create(
    data: Partial<RedirectToGoogleDTO>
  ): [string | null, RedirectToGoogleDTO | null] {
    // If state is not provided, generate a random state
    const state = data.state || RedirectToGoogleDTO.generateRandomState();

    const dto = new RedirectToGoogleDTO(state);
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

  // Utility to generate a random state string
  private static generateRandomState(): string {
    return crypto.randomBytes(16).toString("hex");
  }
}
