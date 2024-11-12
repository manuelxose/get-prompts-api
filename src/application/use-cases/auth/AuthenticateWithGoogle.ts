// src/application/use-cases/auth/AuthenticateWithGoogle.ts

import {
  AuthRepository,
  UserRepository,
  TokenRepository,
} from "../../../domain/repositories";
import { AuthenticateUserResponse } from "../../interfaces/auth/AuthenticateUserResponse";
import { AuthMethod, UserRole } from "../../../domain/enums";
import { CustomError } from "../../../domain/errors";
import { GoogleAuthCodeDTO } from "../../../domain/dtos/auth/GoogleAuthCodeDTO";
import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { uuid } from "../../../core/adapters";
import { GoogleAuthAdapter } from "../../../core/adapters/googleAuthAdapter";
import {
  FindByProviderIdDTO,
  RegisterUserDTO,
} from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities/user";
import { AuthEntity } from "../../../domain/entities/auth";
import { CreateUserDTO } from "../../../domain/dtos/user";
import { RefreshTokenDTO } from "../../../domain/dtos/token";

export class AuthenticateWithGoogle {
  private jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || "secret");
  private uuidAdapter = uuid;
  private googleAuthAdapter = new GoogleAuthAdapter();

  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute(dto: GoogleAuthCodeDTO): Promise<AuthenticateUserResponse> {
    try {
      // 1. Obtener tokens de Google
      const tokens = await this.googleAuthAdapter.getTokens(dto.code);

      console.log("tokens: ", tokens);

      // 2. Obtener información del usuario
      const googleUser = await this.googleAuthAdapter.getUserInfo(tokens);

      console.log("googleUser: ", googleUser);

      // 3. Crear DTO de autenticación
      const authenticateDTO = {
        method: AuthMethod.GOOGLE,
        providerId: googleUser.sub,
        email: googleUser.email,
        displayName: googleUser.name,
        photoURL: googleUser.picture,
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
          photoURL: authenticateDTO.photoURL || "",
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
        console.log("auth: ", auth);

        const [authError, newAuth] = RegisterUserDTO.create(auth);

        if (authError) {
          throw CustomError.badRequest(authError);
        }
        console.log("newAuth: ", newAuth);
        // Guardar el registro de autenticación
        await this.authRepository.register(newAuth!);

        console.log("Se guardo el registro de autenticación");
      }

      // 7. Generar tokens
      const accessToken = tokens.access_token;
      const refreshTokenStr = tokens.refresh_token;

      // 8.  Almacenar RefreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

      const [error, refreshTokenDTO] = RefreshTokenDTO.create({
        token: refreshTokenStr,
        userId: auth.id,
        expiresAt,
        createdAt: new Date(),
      });
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
