// src/infrastructure/routes/user.routes.ts

import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { UserDataSource } from "../datasources";
import { UserRepository } from "../repositories";
import {
  DeleteUserProfile,
  GetUserProfileById,
  UpdateUserProfile,
} from "../../application/use-cases/user";
import { asyncHandler } from "../../core/utils";

export class UserRoutes {
  public router: Router;
  private controller: UserController;
  private userDataSource: UserDataSource;
  private userRepository!: UserRepository;

  // Casos de Uso
  private updateProfileUseCase!: UpdateUserProfile;
  private deleteProfileUseCase!: DeleteUserProfile;
  private getProfileUseCase!: GetUserProfileById;

  constructor() {
    this.router = Router();
    this.userDataSource = new UserDataSource();
    this.controller = this.initializeController();
    this.initializeRoutes();
  }

  private initializeController(): UserController {
    this.userRepository = new UserRepository(this.userDataSource);

    this.updateProfileUseCase = new UpdateUserProfile(this.userRepository);
    this.deleteProfileUseCase = new DeleteUserProfile(this.userRepository);
    this.getProfileUseCase = new GetUserProfileById(this.userRepository);

    return new UserController(
      this.updateProfileUseCase,
      this.deleteProfileUseCase,
      this.getProfileUseCase
    );
  }

  private initializeRoutes(): void {
    this.router.put(
      "/:id",
      authenticateJWT,
      asyncHandler(this.controller.updateProfile.bind(this.controller))
    );
    this.router.delete(
      "/:id",
      authenticateJWT,
      asyncHandler(this.controller.deleteProfile.bind(this.controller))
    );
    this.router.get(
      "/:id",
      authenticateJWT,
      asyncHandler(this.controller.getProfile.bind(this.controller))
    );
  }
}

export default new UserRoutes().router;
