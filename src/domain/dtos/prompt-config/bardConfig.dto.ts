import { Validators } from "../../../shared/validators";
import { BardConfig } from "../../models/prompt";

export class BardConfigDTO implements BardConfig {
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  images!: string[];

  static create(
    data: Partial<BardConfigDTO>
  ): [string | null, BardConfigDTO | null] {
    const dto = new BardConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.prompt)) {
      errors.push("BardConfig prompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push("BardConfig testingPrompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "BardConfig promptInstructions is required and must be a string"
      );
    }

    if (!Validators.isValidImageArray(dto.images)) {
      errors.push(
        "BardConfig images are required and must be a non-empty array of valid URLs"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
