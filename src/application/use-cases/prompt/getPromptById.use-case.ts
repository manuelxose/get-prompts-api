import { generatePromptCacheKey } from "../../../core/utils/cacheKeyGenerator";
import { GetPromptByIdDTO } from "../../../domain/dtos/prompt";
import { PromptEntity } from "../../../domain/entities/prompt";
import { CustomError } from "../../../domain/errors";
import {
  CacheRepository,
  PromptRepository,
} from "../../../domain/repositories";
import { PaginatedPrompt } from "../../interfaces/prompt/PaginatedPrompt";

export class GetPromptByIdUseCase {
  constructor(
    private promptRepository: PromptRepository,
    private cacheRepository: CacheRepository
  ) {}

  /**
   * Ejecutar el caso de uso para obtener un prompt por su ID.
   * @param getPromptByIdDTO DTO que contiene el ID del prompt.
   * @returns El prompt correspondiente.
   */
  async execute(
    getPromptByIdDTO: GetPromptByIdDTO
  ): Promise<PaginatedPrompt<PromptEntity> | null> {
    const { id } = getPromptByIdDTO;

    // Generar la clave de caché basada en el ID del prompt
    const cacheKey = generatePromptCacheKey(id);

    // Intentar obtener el prompt desde la caché
    const cachedPrompt = await this.cacheRepository.get<PromptEntity>(cacheKey);
    if (cachedPrompt) {
      return cachedPrompt;
    }

    // Obtener el prompt desde el repositorio
    const prompt = await this.promptRepository.getPrompt(
      getPromptByIdDTO as any
    );
    if (!prompt) {
      throw CustomError.notFound(`Prompt with ID ${id} not found.`);
    }

    // Almacenar el prompt en la caché con un TTL de 1 hora (3600 segundos)
    await this.cacheRepository.set(cacheKey, prompt, 3600);

    return prompt as any;
  }
}
