// src/application/use-cases/prompt/getPrompt.use-case.ts

import { PromptRepository } from "../../../domain/repositories/prompt.repository";
import { GetPromptDTO } from "../../../domain/dtos/prompt/getPrompt.dto";
import { CustomError } from "../../../domain/errors/customError";
import { PromptEntity } from "../../../domain/entities/prompt";

export class GetPromptUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(getPromptDTO: GetPromptDTO): Promise<PromptEntity> {
    const prompt = await this.promptRepository.getPrompt(getPromptDTO);
    if (!prompt) {
      throw CustomError.notFound("Prompt not found");
    }
    return prompt;
  }
}
