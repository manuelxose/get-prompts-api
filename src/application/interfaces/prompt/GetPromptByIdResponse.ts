import { PromptEntity } from "../../../domain/entities/prompt";

export interface GetPromptByIdResponse {
  success: boolean;
  message: string;
  prompt?: PromptEntity;
}
