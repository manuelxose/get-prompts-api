// src/domain/repositories/prompt.repository.ts

import {
  DeletePromptDTO,
  UpdatePromptDTO,
  GetPromptDTO,
  CreatePromptDTO,
} from "../dtos/prompt";
import { PromptEntity } from "../entities/prompt";

export abstract class PromptRepository {
  abstract create(createPromptDTO: CreatePromptDTO): Promise<PromptEntity>;
  abstract getPrompt(getPromptDTO: GetPromptDTO): Promise<PromptEntity | null>;
  abstract update(dto: UpdatePromptDTO): Promise<PromptEntity>;
  abstract delete(dto: DeletePromptDTO): Promise<void>;
  abstract getPrompts(): Promise<PromptEntity[]>;
}
