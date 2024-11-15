// src/application/use-cases/prompt/getPrompt.use-case.ts

import { GetPromptDTO } from "../../../domain/dtos/prompt/getPrompt.dto";
import { CustomError } from "../../../domain/errors/customError";
import { PromptEntity } from "../../../domain/entities/prompt";
import { generateCacheKey } from "../../../core/utils/cacheKeyGenerator";
import { PaginatedPrompt } from "../../interfaces/prompt/PaginatedPrompt";
import {
  CacheRepository,
  PromptRepository,
} from "../../../domain/repositories";

export class GetPromptUseCase {
  constructor(
    private promptRepository: PromptRepository,
    private cacheRepository: CacheRepository
  ) {}

  async execute(
    getPromptDTO: GetPromptDTO
  ): Promise<PaginatedPrompt<PromptEntity> | null> {
    // Generar la clave de caché basada en los filtros
    const cacheKey = generateCacheKey(getPromptDTO);

    // Intentar obtener los resultados desde la caché
    const cachedResult =
      this.cacheRepository.get<PaginatedPrompt<PromptEntity>>(cacheKey);
    if (cachedResult && cachedResult !== null) {
      return cachedResult;
    }

    // Construir los filtros para la consulta
    const filters: Record<string, any> = {};

    const {
      mainFilter,
      productType,
      typeFilter,
      sortBy,
      model,
      categories,
      generalCategories,
      tags,
      page = 1,
      limit = 10,
    } = getPromptDTO;

    if (mainFilter) {
      switch (mainFilter) {
        case "featured":
          filters.featured = true;
          break;
        case "top":
          filters.likes = { $gte: 100 }; // Ejemplo: más de 100 likes
          break;
        case "new":
          filters.createdAt = {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          }; // Últimos 7 días
          break;
        case "hot":
          filters.views = { $gte: 1000 }; // Ejemplo: más de 1000 vistas
          break;
        default:
          throw CustomError.badRequest(`Invalid mainFilter: ${mainFilter}`);
      }
    }

    if (productType && productType !== "All") {
      filters.productType = productType;
    }

    if (typeFilter && typeFilter !== "All") {
      filters.type = typeFilter;
    }

    if (model && model !== "All") {
      filters.model = model;
    }

    if (categories && categories.length > 0) {
      filters.category = { $in: categories };
    }

    if (generalCategories && generalCategories.length > 0) {
      filters.generalCategory = { $in: generalCategories };
    }

    if (tags && tags.length > 0) {
      filters.tags = { $in: tags };
    }

    // Definir el orden
    let sortOption: Record<string, number> = {};
    if (sortBy) {
      switch (sortBy) {
        case "Trending":
          sortOption = { views: -1 };
          break;
        case "Most Popular":
          sortOption = { likes: -1 };
          break;
        case "Newest":
          sortOption = { createdAt: -1 };
          break;
        default:
          throw CustomError.badRequest(`Invalid sortBy option: ${sortBy}`);
      }
    } else {
      // Orden por defecto
      sortOption = { createdAt: -1 };
    }

    // Ejecutar la consulta en el repositorio
    const prompts = await this.promptRepository.getPrompts(getPromptDTO);

    if (!prompts || prompts.data.length === 0) {
      throw CustomError.notFound("No prompts found matching the criteria.");
    }

    // Almacenar el resultado en la caché con TTL de 1 hora (3600 segundos)
    await this.cacheRepository.set(cacheKey, prompts, 3600);

    return prompts;
  }
}
