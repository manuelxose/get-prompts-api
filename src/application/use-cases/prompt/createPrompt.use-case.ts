// src/application/use-cases/prompt/createPrompt.use-case.ts

import { CreatePromptDTO } from "../../../domain/dtos/prompt";
import { PromptEntity } from "../../../domain/entities/prompt";
import { PromptRepository } from "../../../domain/repositories";

export class CreatePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(createPromptDTO: CreatePromptDTO): Promise<PromptEntity> {
    // Validaciones adicionales pueden ser agregadas aquí

    const prompt = await this.promptRepository.create(createPromptDTO);
    return prompt;
  }
}
