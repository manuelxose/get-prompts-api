import { PromptEntity } from "../../../domain/entities/prompt";

export interface DeactivatePromptResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
