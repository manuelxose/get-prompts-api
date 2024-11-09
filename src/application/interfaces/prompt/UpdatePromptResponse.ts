import { PromptEntity } from "../../../domain/entities/prompt";

export interface UpdatePromptResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
