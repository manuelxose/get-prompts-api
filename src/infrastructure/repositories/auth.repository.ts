import { AuthDataSource } from "../datasources";
import { UserEntity as User } from "../../domain/entities/user/user.entity";
import { AuthRepository } from "../../domain/repositories";
import {
  LoginUserDTO,
  LogoutUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
  GetActiveUserDTO,
  GetActiveUserByEmailDTO,
} from "../../domain/dtos/auth";
import { AuthEntity } from "../../domain/entities/auth/auth.entity";

class ImplAuthRepository implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {
    // Métodos de inicialización o configuración de la base de datos si es necesario
  }
  async login(dto: LoginUserDTO): Promise<AuthEntity> {
    return this.authDataSource.login(dto);
  }
  async logout(dto: LogoutUserDTO): Promise<void> {
    return this.authDataSource.logout(dto);
  }
  async register(dto: RegisterUserDTO): Promise<AuthEntity> {
    return this.authDataSource.register(dto);
  }
  async resetPassword(dto: ResetPasswordDTO): Promise<void> {
    // return this.authDataSource.resetPassword(dto);
  }
  async updatePassword(dto: UpdatePasswordDTO): Promise<AuthEntity> {
    // return this.authDataSource.updatePassword(dto);
    const response: AuthEntity = {} as AuthEntity;
    return response;
  }
  async getAll(): Promise<AuthEntity[]> {
    // return this.authDataSource.getAll();
    return [];
  }
  async getActiveUser(dto: GetActiveUserDTO): Promise<AuthEntity> {
    // return this.authDataSource.getActiveUser(dto);
    const response: AuthEntity = {} as AuthEntity;

    return response;
  }
  async getActiveUserByEmail(
    dto: GetActiveUserByEmailDTO
  ): Promise<AuthEntity> {
    // return this.authDataSource.getActiveUserByEmail(dto);
    const response: AuthEntity = {} as AuthEntity;
    return response;
  }
}

export { ImplAuthRepository as AuthRepository };
