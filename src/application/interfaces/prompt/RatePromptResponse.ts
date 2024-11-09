import { PromptEntity } from "../../../domain/entities/prompt";

export interface RatePromptResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
