import { PromptEntity } from "../../../domain/entities/prompt";

export interface ReviewPromptResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
