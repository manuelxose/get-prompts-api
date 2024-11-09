import {
  CreatePromptDTO,
  DeletePromptDTO,
  GetPromptDTO,
  UpdatePromptDTO,
} from "../dtos/prompt";

export abstract class PromptDataSource {
  abstract getPrompts(): Promise<any>;
  abstract getPromptById(dto: GetPromptDTO): Promise<any>;
  abstract createPrompt(dto: CreatePromptDTO): Promise<any>;
  abstract updatePrompt(dto: UpdatePromptDTO): Promise<any>;
  abstract deletePrompt(dto: DeletePromptDTO): Promise<any>;
}
