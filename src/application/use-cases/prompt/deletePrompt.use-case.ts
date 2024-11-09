import { DeletePromptDTO } from "../../../domain/dtos/prompt";
import { PromptEntity } from "../../../domain/entities/prompt";
import { PromptRepository } from "../../../domain/repositories";

interface DeletePromptResponse {
  success: boolean;
  message: string;
  prompt: string;
}

export class DeletePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}
  async execute(dto: DeletePromptDTO): Promise<DeletePromptResponse> {
    await this.promptRepository.delete(dto);

    const response = {
      success: true,
      message: "Prompt deleted successfully",
      prompt: dto.id,
    };

    return response;
  }
}
