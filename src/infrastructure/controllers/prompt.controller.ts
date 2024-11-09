// src/infrastructure/controllers/prompt.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  CreatePromptUseCase,
  DeletePromptUseCase,
  GetPromptUseCase,
  UpdatePromptUseCase,
} from "../../application/use-cases/prompt";
import {
  CreatePromptDTO,
  DeletePromptDTO,
  GetPromptDTO,
  UpdatePromptDTO,
} from "../../domain/dtos/prompt";

export class PromptController {
  constructor(
    private createPromptUseCase: CreatePromptUseCase,
    private getPromptUseCase: GetPromptUseCase,
    private getpromptByIdUseCase: GetPromptUseCase,
    private updatePromptUseCase: UpdatePromptUseCase,
    private deletePromptUseCase: DeletePromptUseCase
  ) {}

  async createPrompt(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Prompt body is required" });
      }

      const [error, createPromptDTO] = CreatePromptDTO.create(req.body);

      if (error) {
        return res.status(400).json({ message: error });
      }

      const prompt = await this.createPromptUseCase.execute(createPromptDTO!);
      res.status(201).json({ message: "Prompt created successfully", prompt });
    } catch (error) {
      next(error);
    }
  }

  async getPromptById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Prompt ID is required" });
      }

      const [error, getPromptDTO] = GetPromptDTO.create(req.params);

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
