import { Validators } from "../../../shared/validators";
import { PromptBaseConfig } from "../../models/prompt";

export class PromptBaseConfigDTO implements PromptBaseConfig {
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  images!: string[];

  static create(
    data: Partial<PromptBaseConfigDTO>
  ): [string | null, PromptBaseConfigDTO | null] {
    const dto = new PromptBaseConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.prompt)) {
      errors.push("PromptBaseConfig prompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push(
        "PromptBaseConfig testingPrompt is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "PromptBaseConfig promptInstructions is required and must be a string"
      );
    }

    if (!Validators.isValidImageArray(dto.images)) {
      errors.push(
        "PromptBaseConfig images are required and must be a non-empty array of valid URLs"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
