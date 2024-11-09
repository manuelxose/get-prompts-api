import { Validators } from "../../../shared/validators";
import { LeonardoAIConfig } from "../../models/prompt";

export class LeonardoAIConfigDTO implements LeonardoAIConfig {
  model!: string;
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  images!: string[];

  static create(
    data: Partial<LeonardoAIConfigDTO>
  ): [string | null, LeonardoAIConfigDTO | null] {
    const dto = new LeonardoAIConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.model)) {
      errors.push("LeonardoAIConfig model is required and must be a string");
    }

    if (!Validators.isValidString(dto.prompt)) {
      errors.push("LeonardoAIConfig prompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push(
        "LeonardoAIConfig testingPrompt is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "LeonardoAIConfig promptInstructions is required and must be a string"
      );
    }

    if (!Validators.isValidImageArray(dto.images)) {
      errors.push(
        "LeonardoAIConfig images are required and must be a non-empty array of valid URLs"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
