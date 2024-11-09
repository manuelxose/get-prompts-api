import { UpdatePromptDTO } from "../../../domain/dtos/prompt";
import { PromptEntity } from "../../../domain/entities/prompt";
import { PromptRepository } from "../../../domain/repositories";

export class UpdatePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}
  async execute(dto: UpdatePromptDTO): Promise<PromptEntity> {
    return this.promptRepository.update(dto);
  }
}
