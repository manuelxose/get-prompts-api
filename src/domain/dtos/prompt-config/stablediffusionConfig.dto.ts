import { Validators } from "../../../shared/validators";
import { StableDiffusionConfig } from "../../models/prompt";

export class StableDiffusionConfigDTO implements StableDiffusionConfig {
  model!: string;
  sampler!: string;
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  negativePrompt?: string;
  imageWidth!: number;
  imageHeight!: number;
  steps!: number;
  cfgScale!: number;
  clipGuidance?: boolean;
  seed?: number;
  images!: string[];

  static create(
    data: Partial<StableDiffusionConfigDTO>
  ): [string | null, StableDiffusionConfigDTO | null] {
    const dto = new StableDiffusionConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.model)) {
      errors.push(
        "StableDiffusionConfig model is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.sampler)) {
      errors.push(
        "StableDiffusionConfig sampler is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.prompt)) {
      errors.push(
        "StableDiffusionConfig prompt is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push(
        "StableDiffusionConfig testingPrompt is required and must be a string"
      );
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "StableDiffusionConfig promptInstructions is required and must be a string"
      );
    }

    if (
      dto.negativePrompt !== undefined &&
      !Validators.isValidString(dto.negativePrompt)
    ) {
      errors.push("StableDiffusionConfig negativePrompt must be a string");
    }

    if (!Validators.isValidNumber(dto.imageWidth)) {
      errors.push(
        "StableDiffusionConfig imageWidth is required and must be a number"
      );
    }

    if (!Validators.isValidNumber(dto.imageHeight)) {
      errors.push(
        "StableDiffusionConfig imageHeight is required and must be a number"
      );
    }

    if (!Validators.isValidNumber(dto.steps)) {
      errors.push(
        "StableDiffusionConfig steps is required and must be a number"
      );
    }

    if (!Validators.isValidNumber(dto.cfgScale)) {
      errors.push(
        "StableDiffusionConfig cfgScale is required and must be a number"
      );
    }

    if (
      dto.clipGuidance !== undefined &&
      typeof dto.clipGuidance !== "boolean"
    ) {
      errors.push("StableDiffusionConfig clipGuidance must be a boolean");
    }

    if (dto.seed !== undefined && !Validators.isValidNumber(dto.seed)) {
      errors.push("StableDiffusionConfig seed must be a number");
    }

    if (!Validators.isValidImageArray(dto.images)) {
      errors.push(
        "StableDiffusionConfig images are required and must be a non-empty array of valid URLs"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
