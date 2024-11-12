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
  AuthenticateWithApple,
  AuthenticateWithGoogle,
  LoginUser,
  LogoutUser,
  RedirectToApple,
  RedirectToGoogle,
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
    const logoutUseCase = new LogoutUser(tokenRepositoy);
    const loginUseCase = new LoginUser(
      authRepository,
      userRepository,
      tokenRepositoy
    );
    const registerUseCase = new RegisterUser(authRepository, userRepository);
    const redirectToGoogleUseCase = new RedirectToGoogle();
    const authenticateWithGoogleUseCase = new AuthenticateWithGoogle(
      authRepository,
      userRepository,
      tokenRepositoy
    );

    const redirectToAppleUseCase = new RedirectToApple();
    const authenticateWithAppleUseCase = new AuthenticateWithApple(
      authRepository,
      userRepository,
      tokenRepositoy
    );

    return new UserAuthController(
      registerUseCase,
      loginUseCase,
      logoutUseCase,
      redirectToGoogleUseCase,
      authenticateWithGoogleUseCase,
      redirectToAppleUseCase,
      authenticateWithAppleUseCase
    );
  }

  private initializeRoutes(): void {
    this.router.post("/register", asyncHandler(this.controller.register));
    this.router.post("/login", asyncHandler(this.controller.login));
    this.router.post("/logout", asyncHandler(this.controller.logout));

    // Rutas para Google
    this.router.get("/google", asyncHandler(this.controller.googleAuth));
    this.router.get(
      "/google/callback",
      asyncHandler(this.controller.googleCallback)
    );

    // Rutas para Apple
    this.router.get("/apple", asyncHandler(this.controller.appleAuth));
    this.router.post(
      "/apple/callback",
      asyncHandler(this.controller.appleCallback)
    );
  }
}

export default new UserAuthRoutes().router;
