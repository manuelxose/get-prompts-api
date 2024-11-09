// src/infrastructure/controllers/userAuth.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
} from "../../application/use-cases/auth";
import { RegisterUserDTO } from "../../domain/dtos/auth/registerUser.dto";
import { LoginUserDTO } from "../../domain/dtos/auth/loginUser.dto";
import { LogoutUserDTO } from "../../domain/dtos/auth/logoutUser.dto";

export class UserAuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUser,
    private readonly loginUseCase: LoginUser,
    private readonly logoutUseCase: LogoutUser
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
      res.status(200).json({
        response: response,
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
}
