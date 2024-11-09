import logger from "../../core/adapters/logger.adapter";
import { PromptModel } from "../../data/mongodb/models";
import { PromptDataSource } from "../../domain/datasources";
import {
  CreatePromptDTO,
  DeletePromptDTO,
  GetPromptDTO,
  UpdatePromptDTO,
} from "../../domain/dtos/prompt";
import { PromptEntity } from "../../domain/entities/prompt";
import { CustomError } from "../../domain/errors";
import { PromptMapper } from "../mappers/prompt.mapper";

class PromptMongoDataSource implements PromptDataSource {
  /**
   * Obtener todos los prompts activos.
   * @returns Array de PromptEntity.
   */
  async getPrompts(): Promise<PromptEntity[]> {
    logger.info("PromptMongoDataSource: Fetching all prompts");

    try {
      const prompts = await PromptModel.find({ isActive: true });

      if (!prompts || prompts.length === 0) {
        throw CustomError.notFound("No prompts found");
      }

      logger.info(`PromptMongoDataSource: Found ${prompts.length} prompts`);

      return prompts.map((prompt) => PromptMapper.toEntity(prompt));
    } catch (error: unknown) {
      logger.error(`PromptMongoDataSource.getPrompts: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal("An error occurred while fetching prompts");
      }
    }
  }

  /**
   * Obtener un prompt por su ID.
   * @param dto DTO que contiene el ID del prompt.
   * @returns PromptEntity.
   */
  async getPromptById(dto: GetPromptDTO): Promise<PromptEntity> {
    logger.info(`PromptMongoDataSource: Fetching prompt with ID ${dto.id}`);

    try {
      const prompt = await PromptModel.findOne({ id: dto.id, isActive: true });

      if (!prompt) {
        throw CustomError.notFound("Prompt not found");
      }

      logger.info(`PromptMongoDataSource: Found prompt with ID ${dto.id}`);

      return PromptMapper.toEntity(prompt);
    } catch (error: unknown) {
      logger.error(`PromptMongoDataSource.getPromptById: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal(
          "An error occurred while fetching the prompt"
        );
      }
    }
  }

  /**
   * Crear un nuevo prompt.
   * @param dto DTO que contiene los datos para crear el prompt.
   * @returns PromptEntity creado.
   */
  async createPrompt(dto: CreatePromptDTO): Promise<PromptEntity> {
    logger.info(`PromptMongoDataSource: Creating a new prompt`);

    try {
      // Verificar si el usuario existe
      // Asumiendo que tienes un UserDataSource para verificar la existencia del usuario
      // const user = await this.userDataSource.findById({ id: dto.userId });
      // if (!user) throw CustomError.notFound("User not found");

      // Verificar si ya existe un prompt con el mismo nombre para el mismo usuario
      const existingPrompt = await PromptModel.findOne({
        name: dto.name,
        userId: dto.userId,
      });

      if (existingPrompt) {
        throw CustomError.badRequest("Prompt with this name already exists");
      }

      // Crear una nueva instancia de PromptModel
      const newPrompt = new PromptModel({
        id: dto.id,
        userId: dto.userId,
        category: dto.category,
        name: dto.name,
        shortDescription: dto.shortDescription,
        fullDescription: dto.fullDescription,
        price: dto.price,
        customPrice: dto.customPrice,
        country: dto.country,
        tags: dto.tags || [],
        isActive: dto.isActive !== undefined ? dto.isActive : true,
        views: dto.views || 0,
        likes: dto.likes || 0,
        config: dto.config,
        images: dto.images || [],
        ratings: dto.ratings || [],
        reviews: dto.reviews || [],
        salesCount: dto.salesCount || 0,
      });

      await newPrompt.save();

      logger.info(`PromptMongoDataSource: Created prompt with ID ${dto.id}`);

      return PromptMapper.toEntity(newPrompt);
    } catch (error: unknown) {
      logger.error(`PromptMongoDataSource.createPrompt: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal(
          "An error occurred while creating the prompt"
        );
      }
    }
  }

  /**
   * Actualizar un prompt existente.
   * @param dto DTO que contiene los datos para actualizar el prompt.
   * @returns PromptEntity actualizado.
   */
  async updatePrompt(dto: UpdatePromptDTO): Promise<PromptEntity> {
    logger.info(`PromptMongoDataSource: Updating prompt with ID ${dto.id}`);

    try {
      // Encontrar y actualizar el prompt
      const updatedPrompt = await PromptModel.findOneAndUpdate(
        { id: dto.id },
        {
          ...dto,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedPrompt) {
        throw CustomError.notFound("Prompt not found");
      }

      logger.info(`PromptMongoDataSource: Updated prompt with ID ${dto.id}`);

      return PromptMapper.toEntity(updatedPrompt);
    } catch (error: unknown) {
      logger.error(`PromptMongoDataSource.updatePrompt: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal(
          "An error occurred while updating the prompt"
        );
      }
    }
  }

  /**
   * Eliminar un prompt por su ID.
   * @param dto DTO que contiene el ID del prompt a eliminar.
   */
  async deletePrompt(dto: DeletePromptDTO): Promise<void> {
    logger.info(`PromptMongoDataSource: Deleting prompt with ID ${dto.id}`);

    try {
      const result = await PromptModel.findOneAndDelete({ id: dto.id });

      if (!result) {
        throw CustomError.notFound("Prompt not found");
      }

      logger.info(`PromptMongoDataSource: Deleted prompt with ID ${dto.id}`);
    } catch (error: unknown) {
      logger.error(`PromptMongoDataSource.deletePrompt: ${error}`);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internal(
          "An error occurred while deleting the prompt"
        );
      }
    }
  }
}

export { PromptMongoDataSource as PromptDataSource };
