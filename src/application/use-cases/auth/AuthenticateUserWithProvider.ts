import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { AuthenticateUserWithProviderDTO } from "../../../domain/dtos/auth/AutthenticatedUserWithProviderDTO";
import {
  AuthRepository,
  TokenRepository,
  UserRepository,
} from "../../../domain/repositories";
import { AuthenticateUserResponse } from "../../interfaces/auth";
import { uuid } from "../../../core/adapters";
import { RefreshTokenDTO } from "../../../domain/dtos/token";

export class AuthenticateUserWithProvider {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private jwtAdapter: JwtAdapter,
    private tokenRepository: TokenRepository
  ) {}

  async execute(
    authenticateDTO: AuthenticateUserWithProviderDTO
  ): Promise<AuthenticateUserResponse> {
    try {
      console.log("Autenticación de usuario con proveedor: ", authenticateDTO);

      const { method, providerId, email, displayName, photoURL, phoneNumber } =
        authenticateDTO;

      // Buscar AuthEntity por método y providerId
      let auth = await this.authRepository.login({
        email,
        // Otros campos necesarios para el login via proveedor
      } as any); // Ajusta según tu DTO

      if (!auth) {
        // Si no existe, crear un nuevo usuario y AuthEntity
        const userId = uuid.generate();

        const registerUserDTO = {
          id: userId,
          email,
          displayName,
          photoURL,
          phoneNumber,
          isSeller: false,
          promptsPublished: [],
          paymentMethods: [],
          promptsBought: [],
          role: "user",
          nickName: undefined,
          stripeId: undefined,
        };

        await this.userRepository.create(registerUserDTO as any); // Casting necesario

        const newAuth = {
          id: uuid.generate(),
          userId,
          method,
          emailVerified: true, // Suponiendo que el proveedor verifica el email
          createdAt: new Date(),
          updatedAt: new Date(),
          password: undefined, // No se requiere contraseña para proveedores
          providerId,
          email,
        };

        await this.authRepository.register(newAuth as any); // Casting necesario

        auth = newAuth as any;
      }

      // Generar tokens
      const accessToken = this.jwtAdapter.generateAccessToken(auth.userId);
      const refreshTokenStr = this.jwtAdapter.generateRefreshToken();

      // Almacenar RefreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
      const [error, refreshToken] = RefreshTokenDTO.create({
        token: refreshTokenStr,
        userId: auth.id,
        expiresAt,
        createdAt: new Date(),
      });
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
      return {
        success: false,
        message: error.message || "Error al autenticar usuario con proveedor.",
      };
    }
  }
}
