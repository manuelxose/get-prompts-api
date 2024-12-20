// src/infrastructure/controllers/prompt.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  CreatePromptUseCase,
  DeletePromptUseCase,
  GetPromptByIdUseCase,
  GetPromptUseCase,
  UpdatePromptUseCase,
} from "../../application/use-cases/prompt";
import {
  CreatePromptDTO,
  DeletePromptDTO,
  GetPromptByIdDTO,
  UpdatePromptDTO,
  GetPromptDTO,
} from "../../domain/dtos/prompt";
import { CustomError } from "../../domain/errors";
import logger from "../../core/adapters/logger.adapter";
import { FileUploadAdapter } from "../../core/adapters/FileUploadAdapter";

export class PromptController {
  constructor(
    private createPromptUseCase: CreatePromptUseCase,
    private getPromptUseCase: GetPromptUseCase,
    private getpromptByIdUseCase: GetPromptByIdUseCase,
    private updatePromptUseCase: UpdatePromptUseCase,
    private deletePromptUseCase: DeletePromptUseCase
  ) {}
  /**
   * Manejar la creación de un nuevo prompt.
   * @param req Request de Express.
   * @param res Response de Express.
   * @param next NextFunction de Express.
   */
  async createPrompt(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;

      // Crear el DTO con los campos y las imágenes
      const [error, createPromptDTO] = CreatePromptDTO.create(data);

      if (error || !createPromptDTO) {
        console.log("Error de validación en createPromptDTO:", error);
        console.log(
          "Contenido de createPromptDTO después de crear:",
          createPromptDTO
        );
        throw CustomError.badRequest(
          "Error al crear el prompt. Detalle: " +
            (error || "Problema desconocido")
        );
      }
      // Ejecutar el caso de uso para crear el prompt
      const createdPrompt = await this.createPromptUseCase.execute(
        createPromptDTO
      );

      // Responder al cliente con el prompt creado
      res.status(201).json({
        message: "Prompt creado exitosamente",
        prompt: createdPrompt,
      });

      logger.info(`Prompt creado exitosamente con ID ${createdPrompt.id}`);
    } catch (error: any) {
      next(error);
    }
  }

  async getPromptById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Prompt ID is required" });
      }

      const [error, getPromptDTO] = GetPromptByIdDTO.create(req.params);

      if (error) {
        return res.status(400).json({ message: error });
      }

      const prompt = await this.getpromptByIdUseCase.execute(getPromptDTO!);
      res
        .status(200)
        .json({ message: "Prompt retrieved successfully", prompt });
    } catch (error) {
      next(error);
    }
  }

  async getPrompts(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Metodo de getPrompts");
      const [error, getPromptDTO] = GetPromptDTO.create(req.params);

      if (error) {
        return res.status(400).json({ message: error });
      }

      const prompts = await this.getPromptUseCase.execute(getPromptDTO!);
      res
        .status(200)
        .json({ message: "Prompts retrieved successfully", prompts });
    } catch (error) {
      next(error);
    }
  }

  async updatePrompt(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Prompt body is required" });
      }

      const [error, updatePromptDTO] = UpdatePromptDTO.create(req.body);

      if (error) {
        return res.status(400).json({ message: error });
      }

      const prompt = await this.updatePromptUseCase.execute(updatePromptDTO!);
      res.status(200).json({ message: "Prompt updated successfully", prompt });
    } catch (error) {
      next(error);
    }
  }

  async deletePrompt(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Prompt ID is required" });
      }

      const [error, deletePromptDTO] = DeletePromptDTO.create(req.params);

      if (error) {
        return res.status(400).json({ message: error });
      }

      const prompt = await this.deletePromptUseCase.execute(deletePromptDTO!);
      res.status(200).json({ message: "Prompt deleted successfully", prompt });
    } catch (error) {
      next(error);
    }
  }
}
