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
  private jwtAdapter: JwtAdapter = new JwtAdapter(process.env.JWT_SECRET);
  private bcryptAdapter: BcryptAdapter = new BcryptAdapter();

  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute(loginUserDTO: LoginUserDTO): Promise<LoginUserResponse> {
    try {
      console.log("Inicio de sesión de usuario: ", loginUserDTO);

      // Obtener AuthEntity mediante LoginUserDTO
      const auth = await this.authRepository.login(loginUserDTO);
      if (!auth) {
        throw CustomError.notFound("Usuario no encontrado.");
      }

      // Comparar contraseñas
      const isPasswordValid = await this.bcryptAdapter.compare(
        loginUserDTO.password,
        auth.password!
      );
      if (!isPasswordValid) {
        throw CustomError.unauthorized("Contraseña incorrecta.");
      }

      // Verificar si el email está verificado
      if (!auth.emailVerified) {
        throw CustomError.unauthorized("El email no ha sido verificado.");
      }

      // Obtener UserEntity
      const user = await this.userRepository.findById({ id: auth.userId });
      if (!user) {
        throw CustomError.notFound("Perfil de usuario no encontrado.");
      }

      // Generar tokens
      const accessToken = this.jwtAdapter.generateAccessToken(user.id);
      const refreshTokenStr = this.jwtAdapter.generateRefreshToken();

      // Almacenar RefreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

      const [error, refreshToken] = RefreshTokenDTO.create({
        token: refreshTokenStr,
        userId: user.id,
        expiresAt,
        createdAt: new Date(),
      });

      // Almacenar RefreshToken
      if (error) {
        throw CustomError.badRequest("Error al crear el token de refresco.");
      }

      await this.tokenRepository.addRefreshToken(refreshToken!);

      console.log("Usuario autenticado correctamente: ", user.id);

      return {
        success: true,
        message: "Inicio de sesión exitoso.",
        accessToken,
        refreshToken: refreshTokenStr,
      };
    } catch (error: any) {
      console.error("Error al iniciar sesión: ", error);
      return {
        success: false,
        message: error.message || "Error al iniciar sesión.",
      };
    }
  }
}
