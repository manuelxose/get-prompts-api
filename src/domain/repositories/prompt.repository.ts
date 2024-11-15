// src/domain/repositories/prompt.repository.ts

import { Get } from "aws-sdk/clients/dynamodb";
import {
  DeletePromptDTO,
  UpdatePromptDTO,
  GetPromptDTO,
  CreatePromptDTO,
  UploadToDbDTO,
} from "../dtos/prompt";
import { PromptEntity } from "../entities/prompt";
import { PaginatedPrompt } from "../../application/interfaces/prompt/PaginatedPrompt";

export abstract class PromptRepository {
  abstract create(createPromptDTO: UploadToDbDTO): Promise<PromptEntity>;
  abstract getPrompt(getPromptDTO: GetPromptDTO): Promise<PromptEntity | null>;
  abstract update(dto: UpdatePromptDTO): Promise<PromptEntity>;
  abstract delete(dto: DeletePromptDTO): Promise<void>;
  abstract getPrompts(
    dto: GetPromptDTO
  ): Promise<PaginatedPrompt<PromptEntity>>;
}
