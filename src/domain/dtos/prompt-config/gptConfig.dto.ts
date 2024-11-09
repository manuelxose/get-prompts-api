// src/domain/dtos/prompt/GPTConfigDTO.ts

import { Validators } from "../../../shared/validators";
import { GPTConfig } from "../../models/prompt";

export class GPTConfigDTO implements GPTConfig {
  type!: "Completion" | "Chat";
  prompt!: string;
  testingPrompt!: string;
  promptInstructions!: string;
  engine!: string;
  previewInput!: string;
  previewOutput!: string;
  link!: string;
  json!: string;

  static create(
    data: Partial<GPTConfigDTO>
  ): [string | null, GPTConfigDTO | null] {
    const dto = new GPTConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.type) {
      errors.push("GPTConfig type is required");
    } else if (!["Completion", "Chat"].includes(dto.type)) {
      errors.push("Invalid GPTConfig type");
    }

    if (!dto.prompt || typeof dto.prompt !== "string") {
      errors.push("GPTConfig prompt is required and must be a string");
    }

    if (!dto.testingPrompt || typeof dto.testingPrompt !== "string") {
      errors.push("GPTConfig testingPrompt is required and must be a string");
    }

    if (!dto.promptInstructions || typeof dto.promptInstructions !== "string") {
      errors.push(
        "GPTConfig promptInstructions is required and must be a string"
      );
    }

    if (!dto.engine || typeof dto.engine !== "string") {
      errors.push("GPTConfig engine is required and must be a string");
    }

    if (!dto.previewInput || typeof dto.previewInput !== "string") {
      errors.push("GPTConfig previewInput is required and must be a string");
    }

    if (!dto.previewOutput || typeof dto.previewOutput !== "string") {
      errors.push("GPTConfig previewOutput is required and must be a string");
    }

    if (!dto.link || !Validators.isValidURL(dto.link)) {
      errors.push("GPTConfig link is required and must be a valid URL");
    }

    if (!dto.json || typeof dto.json !== "string") {
      errors.push("GPTConfig json is required and must be a string");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
