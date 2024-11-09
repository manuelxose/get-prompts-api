import { Validators } from "../../../shared/validators";
import { DALLEConfig } from "../../models/prompt";

export class DALLEConfigDTO implements DALLEConfig {
  version!: "DALL-E 2" | "DALL-E 3";
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  images!: string[];

  static create(
    data: Partial<DALLEConfigDTO>
  ): [string | null, DALLEConfigDTO | null] {
    const dto = new DALLEConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidDALLEVersion(dto.version)) {
      errors.push("DALLEConfig version is invalid or missing");
    }

    if (!Validators.isValidString(dto.prompt)) {
      errors.push("DALLEConfig prompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push("DALLEConfig testingPrompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "DALLEConfig promptInstructions is required and must be a string"
      );
    }

    if (!Validators.isValidImageArray(dto.images)) {
      errors.push(
        "DALLEConfig images are required and must be a non-empty array of valid URLs"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
