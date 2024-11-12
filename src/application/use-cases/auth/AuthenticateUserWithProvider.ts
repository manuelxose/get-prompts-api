// src/application/use-cases/auth/AuthenticateUserWithProvider.ts

import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import {
  AuthRepository,
  TokenRepository,
  UserRepository,
} from "../../../domain/repositories";
import { AuthenticateUserResponse } from "../../interfaces/auth/AuthenticateUserResponse";
import { RefreshTokenDTO } from "../../../domain/dtos/token/RefreshTokenDTO";
import { uuid } from "../../../core/adapters";

import { UserRole } from "../../../domain/enums";
import { CustomError } from "../../../domain/errors";
import { AuthenticateUserWithProviderDTO } from "../../../domain/dtos/auth/AutthenticatedUserWithProviderDTO";
import { UserEntity } from "../../../domain/entities/user";
import { AuthEntity } from "../../../domain/entities/auth";
import {
  FindByProviderIdDTO,
  RegisterUserDTO,
} from "../../../domain/dtos/auth";

export class AuthenticateUserWithProvider {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private jwtAdapter: JwtAdapter,
    private tokenRepository: TokenRepository,
    private uuidAdapter = uuid
  ) {}

  async execute(
    authenticateDTO: AuthenticateUserWithProviderDTO
  ): Promise<AuthenticateUserResponse> {
    try {
      console.log("Autenticación de usuario con proveedor: ", authenticateDTO);

      const { method, providerId, email, displayName, photoURL, phoneNumber } =
        authenticateDTO;

      //Crear el DTO para buscar el usuario

      const [Ferror, findDTO] = FindByProviderIdDTO.create({
        providerId,
        method,
      });
      if (Ferror) {
        throw new Error(Ferror);
      }

      // Buscar AuthEntity por método y providerId
      let auth = await this.authRepository.findByProviderId(findDTO!);

      if (!auth) {
        // Crear un nuevo usuario
        const userId = this.uuidAdapter.generate();

        const newUser = new UserEntity({
          id: userId,
          displayName: displayName || "Usuario",
          photoURL: photoURL || "",
          phoneNumber: phoneNumber || "",
          isSeller: false,
          role: UserRole.USER,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Guardar el usuario
        await this.userRepository.create(newUser);

        // Crear nuevo AuthEntity
        auth = new AuthEntity({
          id: this.uuidAdapter.generate(),
          userId,
          method,
          emailVerified: true, // Suponiendo que el proveedor verifica el email
          createdAt: new Date(),
          updatedAt: new Date(),
          providerId,
          email,
        });
        const [authError, newAuth] = RegisterUserDTO.create(auth);
        if (authError) {
          throw CustomError.badRequest(authError);
        }
        // Guardar el registro de autenticación
        await this.authRepository.register(newAuth!);
      }

      // Generar tokens
      const accessToken = this.jwtAdapter.generateAccessToken(auth.id);
      const refreshTokenStr = this.jwtAdapter.generateRefreshToken(auth.id);

      // Almacenar RefreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
      const [error, refreshToken] = RefreshTokenDTO.create({
        token: refreshTokenStr,
        userId: auth.userId,
        expiresAt,
        createdAt: new Date(),
      });

      if (error) {
        throw CustomError.internal(error);
      }

      await this.tokenRepository.addRefreshToken(refreshToken!);

      console.log("Usuario autenticado correctamente: ", auth.userId);

      return {
        success: true,
        message: "Autenticación exitosa.",
        accessToken,
        refreshToken: refreshTokenStr,
      };
    } catch (error: any) {
      console.error("Error al autenticar usuario con proveedor: ", error);
      throw error;
    }
  }
}
