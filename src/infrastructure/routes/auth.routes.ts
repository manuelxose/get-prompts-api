// src/infrastructure/routes/userAuth.routes.ts

import { Router } from "express";
import {
  AuthDataSource,
  UserDataSource,
  TokenDataSource,
} from "../datasources";
import {
  AuthRepository,
  UserRepository,
  TokenRepository,
} from "../repositories";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../../application/use-cases/auth";
import { UserAuthController } from "../controllers";
import { asyncHandler } from "../../core/utils";

export class UserAuthRoutes {
  public router: Router;
  private controller: UserAuthController;

  constructor() {
    this.router = Router();
    this.controller = this.initializeController();
    this.initializeRoutes();
  }

  private initializeController(): UserAuthController {
    const authDataSource = new AuthDataSource();
    const userDataSource = new UserDataSource();
    const tokenDataSource = new TokenDataSource();

    const authRepository = new AuthRepository(authDataSource);
    const userRepository = new UserRepository(userDataSource);
    const tokenRepositoy = new TokenRepository(tokenDataSource);

    // Casos de uso
    const registerUseCase = new LogoutUser(authRepository, tokenRepositoy);
    const loginUseCase = new LoginUser(
      authRepository,
      userRepository,
      tokenRepositoy
    );
    const logoutUseCase = new RegisterUser(authRepository, userRepository);

    return new UserAuthController(logoutUseCase, loginUseCase, registerUseCase);
  }

  private initializeRoutes(): void {
    this.router.post("/register", asyncHandler(this.controller.register));
    this.router.post("/login", asyncHandler(this.controller.login));
    this.router.post("/logout", asyncHandler(this.controller.logout));
  }
}

export default new UserAuthRoutes().router;
