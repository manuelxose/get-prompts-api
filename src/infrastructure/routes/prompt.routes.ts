// src/infrastructure/routes/prompt.routes.ts

import { Router } from "express";
import { PromptController } from "../controllers/prompt.controller";

import { PromptDataSource } from "../datasources";
import {
  DeletePromptUseCase,
  GetPromptUseCase,
  UpdatePromptUseCase,
  CreatePromptUseCase,
  GetPromptByIdUseCase,
} from "../../application/use-cases/prompt";
import { asyncHandler } from "../../core/utils";
import { PromptRepository } from "../repositories";
import { CacheRepository, ImageRepository } from "../../domain/repositories";

export class PromptRoutes {
  public router: Router;
  private controller: PromptController;

  private promptDataSource: PromptDataSource;
  private promptRepository!: PromptRepository;
  private cacheRepository!: CacheRepository;
  private imageRepository!: ImageRepository;

  // Casos de Uso
  private createPromptUseCase!: CreatePromptUseCase;
  private getPromptUseCase!: GetPromptUseCase;
  private getPromptByIdUseCase!: GetPromptByIdUseCase;
  private updatePromptUseCase!: UpdatePromptUseCase;
  private deletePromptUseCase!: DeletePromptUseCase;

  constructor() {
    this.router = Router();
    this.promptDataSource = new PromptDataSource();
    this.controller = this.initializeController();
    this.initializeRoutes();
  }

  private initializeController(): PromptController {
    this.promptRepository = new PromptRepository(this.promptDataSource);

    this.createPromptUseCase = new CreatePromptUseCase(
      this.promptRepository,
      this.imageRepository
    );
    this.getPromptUseCase = new GetPromptUseCase(
      this.promptRepository,
      this.cacheRepository
    );
    this.getPromptByIdUseCase = new GetPromptByIdUseCase(
      this.promptRepository,
      this.cacheRepository
    );
    this.getPromptByIdUseCase = new GetPromptByIdUseCase(
      this.promptRepository,
      this.cacheRepository
    );
    this.updatePromptUseCase = new UpdatePromptUseCase(this.promptRepository);
    this.deletePromptUseCase = new DeletePromptUseCase(this.promptRepository);

    return new PromptController(
      this.createPromptUseCase,
      this.getPromptUseCase,
      this.getPromptByIdUseCase,
      this.updatePromptUseCase,
      this.deletePromptUseCase
    );
  }

  private initializeRoutes(): void {
    this.router.post("/", asyncHandler(this.controller.createPrompt));
    this.router.get("/:id", asyncHandler(this.controller.getPromptById));
    this.router.get("/", asyncHandler(this.controller.getPrompts));
    this.router.put("/:id", asyncHandler(this.controller.updatePrompt));
    this.router.delete("/:id", asyncHandler(this.controller.deletePrompt));
  }
}
