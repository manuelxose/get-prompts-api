// src/infrastructure/repositories/prompt.repository.ts

import {
  CreatePromptDTO,
  DeletePromptDTO,
  GetPromptDTO,
  UpdatePromptDTO,
} from "../../domain/dtos/prompt";
import { PromptEntity } from "../../domain/entities/prompt";
import { PromptRepository } from "../../domain/repositories";
import { PromptDataSource } from "../datasources";

class PromptMongoRepository implements PromptRepository {
  constructor(private readonly PromptDataSource: PromptDataSource) {}

  async create(dto: CreatePromptDTO): Promise<PromptEntity> {
    return this.PromptDataSource.createPrompt(dto);
  }

  async getPrompt(dto: GetPromptDTO): Promise<PromptEntity | null> {
    return this.PromptDataSource.getPromptById(dto);
  }

  async update(dto: UpdatePromptDTO): Promise<PromptEntity> {
    return this.PromptDataSource.updatePrompt(dto);
  }

  async delete(dto: DeletePromptDTO): Promise<void> {
    return this.PromptDataSource.deletePrompt(dto);
  }

  async getPrompts(): Promise<PromptEntity[]> {
    return this.PromptDataSource.getPrompts();
  }
}

export { PromptMongoRepository as PromptRepository };
