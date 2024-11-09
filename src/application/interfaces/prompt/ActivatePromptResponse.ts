import { PromptEntity } from "../../../domain/entities/prompt";

export interface ActivatePromptResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
