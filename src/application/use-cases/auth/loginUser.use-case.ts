// src/application/use-cases/auth/LoginUser.ts

import { BcryptAdapter } from "../../../core/adapters";
import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { LoginUserDTO } from "../../../domain/dtos/auth";
import { RefreshTokenDTO } from "../../../domain/dtos/token";
import { CustomError } from "../../../domain/errors";
import {
  AuthRepository,
  TokenRepository,
  UserRepository,
} from "../../../domain/repositories";
import { LoginUserResponse } from "../../interfaces/auth";

export class LoginUser {
  private jwtAdapter: JwtAdapter;
  private bcryptAdapter: BcryptAdapter = new BcryptAdapter();

  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository
  ) {
    this.jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || "secret");
  }

  /**
   * Inicia sesión de un usuario.
   * @param loginUserDTO - DTO que contiene las credenciales del usuario.
   * @returns Promise<LoginUserResponse> - Respuesta del inicio de sesión.
   * @throws CustomError si ocurre un error durante el inicio de sesión.
   */
  async execute(loginUserDTO: LoginUserDTO): Promise<LoginUserResponse> {
    try {
      // Obtener AuthEntity por email
      const auth = await this.authRepository.login(loginUserDTO);

      if (!auth.password) {
        throw CustomError.badRequest(
          "Contraseña no establecida para este usuario"
        );
      }

      // Comparar contraseñas
      const isPasswordValid = await this.bcryptAdapter.compare(
        loginUserDTO.password,
        auth.password
      );
      if (!isPasswordValid) {
        throw CustomError.unauthorized("Contraseña incorrecta.");
      }

      // Verificar si el email está verificado
      if (!auth.emailVerified) {
        throw CustomError.unauthorized("El email no ha sido verificado.");
      }

      // Obtener UserEntity
      // const user = await this.userRepository.findById({ id: auth.userId });
      // if (!user) {
      //   throw CustomError.notFound("Perfil de usuario no encontrado.");
      // }

      //Obtener AuthEntity
      console.log("auth.id: ", auth.id);

      // Generar tokens
      const accessToken = this.jwtAdapter.generateAccessToken(auth.id);
      const refreshTokenStr = this.jwtAdapter.generateRefreshToken(auth.id);

      // Almacenar RefreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

      const [error, refreshTokenDTO] = RefreshTokenDTO.create({
        token: refreshTokenStr,
        userId: auth.id,
        expiresAt,
        createdAt: new Date(),
      });

      if (error) {
        throw CustomError.badRequest(error);
      }

      await this.tokenRepository.addRefreshToken(refreshTokenDTO!);

      return {
        success: true,
        message: "Inicio de sesión exitoso.",
        accessToken,
        refreshToken: refreshTokenStr,
      };
    } catch (error: any) {
      console.error("Error al iniciar sesión: ", error);
      throw error; // Re-lanzar el error para ser manejado por el middleware
    }
  }
}
