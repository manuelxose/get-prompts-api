// src/infrastructure/data-sources/MongoAuthDataSource.ts

import { BcryptAdapter } from "../../core/adapters";
import {
  FindByProviderIdDTO,
  GetActiveUserDTO,
  LoginUserDTO,
  LogoutUserDTO,
  RegisterUserDTO,
} from "../../domain/dtos/auth";
import { AuthEntity } from "../../domain/entities/auth";
import { CustomError } from "../../domain/errors";
import { AuthDataSource } from "../../domain/datasources";
import { AuthModel } from "../../data/mongodb/models";
import { AuthMapper } from "../mappers/auth.mapper";
import { AuthMethod } from "../../domain/enums";
import { FindUserByEmailDTO } from "../../domain/dtos/user";

class MongoAuthDataSource implements AuthDataSource {
  private bcrypt = new BcryptAdapter();

  /**
   * Inicia sesión de un usuario utilizando sus credenciales.
   * @param loginUserDTO - DTO que contiene las credenciales del usuario.
   * @returns Promise<AuthEntity> - Entidad de autenticación del usuario.
   * @throws CustomError si el usuario no es encontrado o la contraseña es incorrecta.
   */
  async login(loginUserDTO: LoginUserDTO): Promise<AuthEntity> {
    const auth = await AuthModel.findOne({ email: loginUserDTO.email });

    if (!auth) {
      throw CustomError.badRequest("Usuario no encontrado");
    }

    if (!auth.password) {
      throw CustomError.badRequest(
        "Contraseña no establecida para este usuario"
      );
    }

    const isPasswordValid = await this.bcrypt.compare(
      loginUserDTO.password.trim(),
      auth.password.trim()
    );

    if (!isPasswordValid) {
      throw CustomError.badRequest(
        "Credenciales inválidas: Contraseña incorrecta"
      );
    }
    return AuthMapper.toEntity(auth);
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * @param registerUserDTO - DTO que contiene los detalles de registro del usuario.
   * @returns Promise<AuthEntity> - Entidad de autenticación del usuario registrado.
   * @throws CustomError si el usuario ya existe.
   */
  async register(registerUserDTO: RegisterUserDTO): Promise<AuthEntity> {
    const existingAuth = await AuthModel.findOne({
      email: registerUserDTO.email,
    });

    if (existingAuth) {
      throw CustomError.badRequest("El usuario ya existe");
    }
    console.log("registerUserDTO: ", registerUserDTO);

    const newAuth = new AuthModel({
      _id: registerUserDTO.id,
      userId: registerUserDTO.userId, // Asumiendo que el ID del usuario es el mismo que el ID de auth
      method: registerUserDTO.method || AuthMethod.EMAIL,
      emailVerified: registerUserDTO.emailVerified || false,
      password: registerUserDTO.password,
      email: registerUserDTO.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newAuth.save();

    return AuthMapper.toEntity(newAuth);
  }

  /**
   * Busca un registro de autenticación por email.
   * @param email - Email del usuario.
   * @returns Promise<AuthEntity | null> - Entidad de autenticación si existe.
   */
  async findByEmail(dto: FindUserByEmailDTO): Promise<AuthEntity | null> {
    const { email } = dto;
    const auth = await AuthModel.findOne({ email });

    return auth ? AuthMapper.toEntity(auth) : null;
  }

  /**
   * Busca un registro de autenticación por ID de usuario.
   * @param userId - ID del usuario.
   * @returns Promise<AuthEntity | null> - Entidad de autenticación si existe.
   */
  async findById(userId: GetActiveUserDTO): Promise<AuthEntity | null> {
    const auth = await AuthModel.findOne({ userId });
    return auth ? AuthMapper.toEntity(auth) : null;
  }

  /**
   * Logout de un usuario.
   * @param logoutUserDTO - DTO que contiene los detalles de cierre de sesión.
   * @returns Promise<void>
   * @throws CustomError si el registro de autenticación no es encontrado o el token de refresco no existe.
   */
  async logout(logoutUserDTO: LogoutUserDTO): Promise<void> {
    const { userId, refreshToken } = logoutUserDTO;
    const auth = await AuthModel.findOne({ userId });
    if (!auth) {
      throw CustomError.notFound(
        "Registro de autenticación no encontrado para el usuario"
      );
    }
  }

  /**
   * Busca un registro de autenticación por providerId y método.
   * @param dto - DTO que contiene providerId y método de autenticación.
   * @returns Promise<AuthEntity | null> - Entidad de autenticación si existe.
   */
  async findByProviderId(dto: FindByProviderIdDTO): Promise<AuthEntity | null> {
    const { providerId, method } = dto;
    const auth = await AuthModel.findOne({ providerId, method });

    return auth ? AuthMapper.toEntity(auth) : null;
  }
}

export { MongoAuthDataSource as AuthDataSource };
