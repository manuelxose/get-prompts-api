// src/application/use-cases/auth/AuthenticateWithApple.ts

import {
  AuthRepository,
  UserRepository,
  TokenRepository,
} from "../../../domain/repositories";
import { AuthenticateUserResponse } from "../../interfaces/auth/AuthenticateUserResponse";
import { AuthMethod, UserRole } from "../../../domain/enums";
import { CustomError } from "../../../domain/errors";
import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { AppleAuthAdapter, uuid } from "../../../core/adapters";
import {
  AppleAuthCodeDTO,
  FindByProviderIdDTO,
  RegisterUserDTO,
} from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities/user";
import { AuthEntity } from "../../../domain/entities/auth";
import { CreateUserDTO } from "../../../domain/dtos/user";
import { RefreshTokenDTO } from "../../../domain/dtos/token";

export class AuthenticateWithApple {
  private jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || "secret");
  private uuidAdapter = uuid;
  private appleAuthAdapter = new AppleAuthAdapter();

  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute(dto: AppleAuthCodeDTO): Promise<AuthenticateUserResponse> {
    try {
      // 1. Obtener tokens de Apple
      const tokens = await this.appleAuthAdapter.getTokens(dto.code);

      // 2. Decodificar el id_token para obtener información del usuario
      const appleUser = this.appleAuthAdapter.decodeIdToken(tokens.id_token);

      // 3. Crear DTO de autenticación
      const authenticateDTO = {
        method: AuthMethod.APPLE,
        providerId: appleUser.sub,
        email: appleUser.email,
        displayName: appleUser.email
          ? appleUser.email.split("@")[0]
          : "Usuario",
      };

      // 4. Buscar AuthEntity por método y providerId
      const [dtoError, findByProviderIdDTO] = FindByProviderIdDTO.create({
        providerId: authenticateDTO.providerId,
        method: authenticateDTO.method,
      });

      if (dtoError) {
        throw CustomError.badRequest(dtoError);
      }

      let auth = await this.authRepository.findByProviderId(
        findByProviderIdDTO!
      );

      if (!auth) {
        // 5. Crear nuevo usuario
        const userId = this.uuidAdapter.generate();

        const newUser = new UserEntity({
          id: userId,
          displayName: authenticateDTO.displayName || "Usuario",
          role: UserRole.USER,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const [error, userDTO] = CreateUserDTO.create(newUser);
        if (error) {
          throw CustomError.badRequest(error);
        }

        await this.userRepository.create(userDTO!);

        // 6. Crear nuevo AuthEntity
        auth = new AuthEntity({
          id: this.uuidAdapter.generate(),
          userId,
          method: authenticateDTO.method,
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          providerId: authenticateDTO.providerId,
          email: authenticateDTO.email,
        });

        const [authError, newAuth] = RegisterUserDTO.create(auth);

        if (authError) {
          throw CustomError.badRequest(authError);
        }

        // Guardar el registro de autenticación
        await this.authRepository.register(newAuth!);
      }

      // 7. Generar tokens
      const accessToken = this.jwtAdapter.generateAccessToken(auth.id);
      const refreshTokenStr = this.jwtAdapter.generateRefreshToken(auth.id);

      // 8. Almacenar RefreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

      const [refreshError, refreshTokenDTO] = RefreshTokenDTO.create({
        token: refreshTokenStr,
        userId: auth.id,
        expiresAt,
        createdAt: new Date(),
      });

      if (refreshError) {
        throw CustomError.badRequest(refreshError);
      }

      await this.tokenRepository.addRefreshToken(refreshTokenDTO!);

      return {
        success: true,
        message: "Autenticación exitosa.",
        accessToken,
        refreshToken: refreshTokenStr,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
