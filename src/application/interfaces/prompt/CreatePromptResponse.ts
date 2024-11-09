// src/application/interfaces/responses/prompt/CreatePromptResponse.ts

import { PromptEntity } from "../../../domain/entities/prompt";

export interface CreatePromptResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
