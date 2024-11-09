import { PromptEntity } from "../../../domain/entities/prompt";

export interface SearchPromptsResponse {
  success: boolean;
  message: string;
  prompts: PromptEntity[];
}
