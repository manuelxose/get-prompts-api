// src/infrastructure/controllers/userAuth.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  RedirectToApple,
} from "../../application/use-cases/auth";
import { RegisterUserDTO } from "../../domain/dtos/auth/registerUser.dto";
import { LoginUserDTO } from "../../domain/dtos/auth/loginUser.dto";
import { LogoutUserDTO } from "../../domain/dtos/auth/logoutUser.dto";
import { RedirectToGoogleDTO } from "../../domain/dtos/auth/RedirectToGoogleDTO";
import { RedirectToGoogle } from "../../application/use-cases/auth/RedirectToGoogle";
import { AuthenticateWithGoogle } from "../../application/use-cases/auth/AuthenticateWithGoogle";
import { GoogleAuthCodeDTO } from "../../domain/dtos/auth/GoogleAuthCodeDTO";
import { RedirectToAppleDTO } from "../../domain/dtos/auth/RedirectToAppleDTO";
import { AuthenticateWithApple } from "../../application/use-cases/auth/AuthenticateWithApple";
import { AppleAuthCodeDTO } from "../../domain/dtos/auth";

export class UserAuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUser,
    private readonly loginUseCase: LoginUser,
    private readonly logoutUseCase: LogoutUser,
    private readonly redirectToGoogleUseCase: RedirectToGoogle,
    private readonly authenticateWithGoogleUseCase: AuthenticateWithGoogle,
    private readonly redirectToAppleUseCase: RedirectToApple,
    private readonly authenticateWithAppleUseCase: AuthenticateWithApple
  ) {}

  // Definición como funciones flecha
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerDTO: RegisterUserDTO = req.body;
      const user = await this.registerUserUseCase.execute(registerDTO);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [error, loginDTO] = LoginUserDTO.create(req.body);
      if (error) {
        return res.status(400).json({ message: error });
      }
      const response = await this.loginUseCase.execute(loginDTO!);

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600 * 24 * 7,
      });

      res.status(200).json({
        accessToken: response.accessToken,
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [error, logoutDTO] = LogoutUserDTO.create({ userId: req.body });
    if (error) {
      next(error);
      return;
    }

    try {
      await this.logoutUseCase.execute(logoutDTO!);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };

  // MEtodos de autenticacion por google

  // Método para iniciar autenticación con Google
  googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [error, redirectToGoogleDTO] = RedirectToGoogleDTO.create(
        req.query
      );
      if (error) {
        return res.status(400).json({ message: error });
      }
      const response = this.redirectToGoogleUseCase.execute(
        redirectToGoogleDTO!
      );
      res.redirect(response.url);
    } catch (error) {
      next(error);
    }
  };

  // Callback de Google
  googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.query: ", req.query);
      const [error, googleAuthCodeDTO] = GoogleAuthCodeDTO.create(req.query);
      if (error) {
        return res.status(400).json({ message: error });
      }

      console.log("googleAuthCodeDTO: ", googleAuthCodeDTO);

      const response = await this.authenticateWithGoogleUseCase.execute(
        googleAuthCodeDTO!
      );

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600 * 24 * 7, // 7 días
      });

      res.status(200).json({
        accessToken: response.accessToken,
        message: "Login with Google successful",
      });
    } catch (error) {
      next(error);
    }
  };

  // METODOS DE AUTHENTICACIÓN DE APPLE

  // Método para iniciar autenticación con Apple
  appleAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [error, redirectToAppleDTO] = RedirectToAppleDTO.create(req.query);
      if (error) {
        return res.status(400).json({ message: error });
      }
      const response = await this.redirectToAppleUseCase.execute(
        redirectToAppleDTO!
      );
      res.redirect(response.url);
    } catch (error) {
      next(error);
    }
  };

  // Callback de Apple
  appleCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [error, appleAuthCodeDTO] = AppleAuthCodeDTO.create(req.body);
      if (error) {
        return res.status(400).json({ message: error });
      }

      const response = await this.authenticateWithAppleUseCase.execute(
        appleAuthCodeDTO!
      );

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600 * 24 * 7, // 7 días
      });

      res.status(200).json({
        accessToken: response.accessToken,
        message: "Login with Apple successful",
      });
    } catch (error) {
      next(error);
    }
  };
}
