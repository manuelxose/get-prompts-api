import {
  GetActiveUserDTO,
  LoginUserDTO,
  LogoutUserDTO,
  RegisterUserDTO,
} from "../dtos/auth";
import { AuthEntity } from "../entities/auth/auth.entity";

export abstract class AuthDataSource {
  abstract register(dto: RegisterUserDTO): Promise<AuthEntity>;
  abstract findById(dto: GetActiveUserDTO): Promise<AuthEntity | null>;
  abstract logout(dto: LogoutUserDTO): Promise<void>;
  abstract login(udto: LoginUserDTO): Promise<AuthEntity>;
}
