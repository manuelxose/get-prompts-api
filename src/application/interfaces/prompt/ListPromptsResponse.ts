import { PromptEntity } from "../../../domain/entities/prompt";

export interface ListPromptsResponse {
  success: boolean;
  message: string;
  prompts: PromptEntity[];
}
