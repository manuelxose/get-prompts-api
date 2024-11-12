// src/application/use-cases/auth/RegisterUser.ts

import { BcryptAdapter } from "../../../core/adapters";
import { CustomError } from "../../../domain/errors";
import { AuthRepository, UserRepository } from "../../../domain/repositories";
import { RegisterUserResponse } from "../../interfaces/user/RegisterUserResponse";
import {
  GetActiveUserByEmailDTO,
  RegisterUserDTO,
} from "../../../domain/dtos/auth";
import { CreateUserDTO } from "../../../domain/dtos/user";
import { uuid } from "../../../core/adapters";
import { AuthEntity } from "../../../domain/entities/auth";
import { UserEntity } from "../../../domain/entities/user";
import { AuthMethod } from "../../../domain/enums";

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

      const [erro, activeDTO] = GetActiveUserByEmailDTO.create({
        email: registerUserDTO.email,
      });

      if (erro) {
        throw erro;
      }
      const existingUser = await this.authRepository.getActiveUserByEmail(
        activeDTO!
      );

      if (existingUser) {
        throw CustomError.badRequest("El usuario ya existe");
      }
      // Verificar si el email ya está registrado en UserRepository

      // Hashear la contraseña
      const hashedPassword = await this.bcryptAdapter.hash(
        registerUserDTO.password
      );

      // Crear el nuevo usuario
      const newUser = new UserEntity();

      if (!newUser) {
        throw CustomError.internal("Error al crear el nuevo usuario");
      }

      //crear user dto

      const [error, userDTO] = CreateUserDTO.create(newUser);

      console.log("newUser: ", userDTO);

      if (error) {
        throw CustomError.badRequest(error);
      }

      const userResp = await this.userRepository.create(userDTO!);

      console.log("userResp: ", userResp);

      // Crear el nuevo Auth
      const auth = new AuthEntity(
        uuid.generate(),
        userResp.id,
        AuthMethod.EMAIL,
        false,
        new Date(),
        new Date(),
        hashedPassword,
        undefined,
        registerUserDTO.email
      );

      console.log(auth);

      const [authError, newAuth] = RegisterUserDTO.create(auth);

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
