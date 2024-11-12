// src/domain/repositories/AuthRepository.ts

import {
  FindByProviderIdDTO,
  GetActiveUserByEmailDTO,
  GetActiveUserDTO,
  LoginUserDTO,
  LogoutUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
} from "../dtos/auth";
import { AuthEntity } from "../entities/auth/auth.entity";

export abstract class AuthRepository {
  abstract login(loginUserDTO: LoginUserDTO): Promise<AuthEntity>;
  abstract logout(logoutUserDTO: LogoutUserDTO): Promise<void>;
  abstract register(registerUserDTO: RegisterUserDTO): Promise<AuthEntity>;

  abstract resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<void>;
  abstract getActiveUser(
    getActiveUserDTO: GetActiveUserDTO
  ): Promise<AuthEntity>;
  abstract getActiveUserByEmail(
    getActiveUserByEmailDTO: GetActiveUserByEmailDTO
  ): Promise<AuthEntity | null>;
  abstract updatePassword(
    updatePasswordDTO: UpdatePasswordDTO
  ): Promise<AuthEntity>;
  abstract getAll(): Promise<AuthEntity[]>;
  abstract findByProviderId(
    dto: FindByProviderIdDTO
  ): Promise<AuthEntity | null>;
}
