// src/infrastructure/routes/prompt.routes.ts

import { Router } from "express";
import { PromptController } from "../controllers/prompt.controller";

import {
  CacheDataSource,
  ImageDataSource,
  PromptDataSource,
  UserDataSource,
} from "../datasources";
import {
  DeletePromptUseCase,
  GetPromptUseCase,
  UpdatePromptUseCase,
  CreatePromptUseCase,
  GetPromptByIdUseCase,
} from "../../application/use-cases/prompt";
import { asyncHandler } from "../../core/utils";
import {
  PromptRepository,
  ImageRepository,
  CacheRepository,
  UserRepository,
} from "../repositories";

export class PromptRoutes {
  public router: Router;
  private controller: PromptController;

  private promptDataSource: PromptDataSource;
  private imageDataSource: ImageDataSource;
  private cacheDataSource: CacheDataSource;
  private userDataSource: UserDataSource;

  private promptRepository!: PromptRepository;
  private cacheRepository!: CacheRepository;
  private imageRepository!: ImageRepository;
  private userRepository!: UserRepository;

  // Casos de Uso
  private createPromptUseCase!: CreatePromptUseCase;
  private getPromptUseCase!: GetPromptUseCase;
  private getPromptByIdUseCase!: GetPromptByIdUseCase;
  private updatePromptUseCase!: UpdatePromptUseCase;
  private deletePromptUseCase!: DeletePromptUseCase;

  constructor() {
    this.router = Router();
    this.promptDataSource = new PromptDataSource();
    this.imageDataSource = new ImageDataSource();
    this.cacheDataSource = new CacheDataSource();
    this.userDataSource = new UserDataSource();

    this.controller = this.initializeController();
    this.initializeRoutes();
  }

  private initializeController(): PromptController {
    this.promptRepository = new PromptRepository(this.promptDataSource);
    this.imageRepository = new ImageRepository(this.imageDataSource);
    this.cacheRepository = new CacheRepository(this.cacheDataSource);
    this.userRepository = new UserRepository(this.userDataSource);

    this.createPromptUseCase = new CreatePromptUseCase(
      this.promptRepository,
      this.imageRepository,
      this.userRepository
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
    //puebas para post si funciona, sin llamar al controller, solo devuelve hola

    this.router.post(
      "/",
      asyncHandler(this.controller.createPrompt.bind(this.controller))
    );
    this.router.get("/:id", asyncHandler(this.controller.getPromptById));
    this.router.get(
      "/",
      asyncHandler(this.controller.getPrompts.bind(this.controller))
    );
    this.router.put("/:id", asyncHandler(this.controller.updatePrompt));
    this.router.delete("/:id", asyncHandler(this.controller.deletePrompt));
  }
}

export default new PromptRoutes().router;
