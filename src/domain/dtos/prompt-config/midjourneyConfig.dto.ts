import { Validators } from "../../../shared/validators";
import { MidJourneyConfig } from "../../models/prompt";

export class MidJourneyConfigDTO implements MidJourneyConfig {
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  images!: string[];

  static create(
    data: Partial<MidJourneyConfigDTO>
  ): [string | null, MidJourneyConfigDTO | null] {
    const dto = new MidJourneyConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.prompt)) {
      errors.push("MidJourneyConfig prompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push(
        "MidJourneyConfig testingPrompt is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "MidJourneyConfig promptInstructions is required and must be a string"
      );
    }

    if (!Validators.isValidImageArray(dto.images)) {
      errors.push(
        "MidJourneyConfig images are required and must be a non-empty array of valid URLs"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
