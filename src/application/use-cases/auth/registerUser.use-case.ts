// src/application/use-cases/auth/RegisterUser.ts

import { BcryptAdapter } from "../../../core/adapters";
import { CustomError } from "../../../domain/errors";
import { AuthRepository, UserRepository } from "../../../domain/repositories";
import { RegisterUserResponse } from "../../interfaces/user/RegisterUserResponse";
import { RegisterUserDTO } from "../../../domain/dtos/auth";
import { CreateUserDTO } from "../../../domain/dtos/user";
import { uuid } from "../../../core/adapters";
import { AuthEntity } from "../../../domain/entities/auth";

export class RegisterUser {
  private bcryptAdapter: BcryptAdapter = new BcryptAdapter();

  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    registerUserDTO: RegisterUserDTO
  ): Promise<RegisterUserResponse> {
    try {
      console.log("Registro de usuario: ", registerUserDTO);

      // Verificar si el email ya está registrado en UserRepository
      const existingUser = await this.userRepository.findByEmail(
        registerUserDTO
      );
      if (existingUser) {
        throw CustomError.badRequest("El email ya está registrado.");
      }

      // Hashear la contraseña
      const hashedPassword = await this.bcryptAdapter.hash(
        registerUserDTO.password
      );

      // Crear el nuevo usuario

      const [error, userDTO] = CreateUserDTO.create(registerUserDTO);

      if (error) {
        throw CustomError.badRequest(error);
      }

      console.log("Creando nuevo usuario: ", userDTO);

      const newUser = await this.userRepository.create(userDTO!);

      if (!newUser) {
        throw CustomError.internal("Error al crear el nuevo usuario");
      }

      // Crear el nuevo Auth
      const auth = new AuthEntity(
        uuid.generate(),
        newUser.id,
        registerUserDTO.method,
        registerUserDTO.emailVerified,
        new Date(),
        new Date(),
        hashedPassword,
        undefined,
        registerUserDTO.email
      );

      const [authError, newAuth] = RegisterUserDTO.create(registerUserDTO);

      if (authError) {
        throw CustomError.badRequest(authError);
      }

      await this.authRepository.register(newAuth!); // Casting necesario

      return {
        success: true,
        message: "Usuario registrado exitosamente.",
        user: newUser,
      };
    } catch (error: any) {
      console.error("Error al registrar usuario: ", error);
      return {
        success: false,
        message: error.message || "Error al registrar el usuario.",
      };
    }
  }
}
