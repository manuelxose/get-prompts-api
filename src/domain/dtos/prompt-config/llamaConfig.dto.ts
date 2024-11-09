import { Validators } from "../../../shared/validators";
import { LlamaConfig } from "../../models/prompt";

export class LlamaConfigDTO implements LlamaConfig {
  model!: string;
  prompt!: string;
  testingPrompt!: string;
  maxTokens!: number;
  temperature!: number;
  topP!: number;
  frequencyPenalty!: number;
  previewInput!: string;
  previewOutput!: string;
  promptInstructions!: string;

  static create(
    data: Partial<LlamaConfigDTO>
  ): [string | null, LlamaConfigDTO | null] {
    const dto = new LlamaConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!Validators.isValidString(dto.model)) {
      errors.push("LlamaConfig model is required and must be a string");
    }

    if (!Validators.isValidString(dto.prompt)) {
      errors.push("LlamaConfig prompt is required and must be a string");
    }

    if (!Validators.isValidString(dto.testingPrompt)) {
      errors.push("LlamaConfig testingPrompt is required and must be a string");
    }

    if (!Validators.isValidNumber(dto.maxTokens)) {
      errors.push("LlamaConfig maxTokens is required and must be a number");
    }

    if (!Validators.isValidNumber(dto.temperature)) {
      errors.push("LlamaConfig temperature is required and must be a number");
    }

    if (!Validators.isValidNumber(dto.topP)) {
      errors.push("LlamaConfig topP is required and must be a number");
    }

    if (!Validators.isValidNumber(dto.frequencyPenalty)) {
      errors.push(
        "LlamaConfig frequencyPenalty is required and must be a number"
      );
    }

    if (!Validators.isValidString(dto.previewInput)) {
      errors.push("LlamaConfig previewInput is required and must be a string");
    }

    if (!Validators.isValidString(dto.previewOutput)) {
      errors.push("LlamaConfig previewOutput is required and must be a string");
    }

    if (!Validators.isValidString(dto.promptInstructions)) {
      errors.push(
        "LlamaConfig promptInstructions is required and must be a string"
      );
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
