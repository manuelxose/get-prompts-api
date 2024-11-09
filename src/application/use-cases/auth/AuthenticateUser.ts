import { JwtAdapter } from "../../../core/adapters/jwt.adapter";
import { AuthRepository } from "../../../domain/repositories";
import { AuthenticateUserResponse } from "../../interfaces/auth";

export class AuthenticateUser {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: JwtAdapter
  ) {}

  async execute(
    authenticateUserDTO: AuthenticateUserDTO
  ): Promise<AuthenticateUserResponse> {
    try {
      console.log("Autenticación de usuario: ", authenticateUserDTO);

      // Obtener el usuario por email
      const user = await this.authRepository.getUserByEmail(
        authenticateUserDTO.email
      );
      if (!user) {
        throw CustomError.notFound("Usuario no encontrado.");
      }

      // Comparar contraseñas
      const isPasswordValid = await comparePasswords(
        authenticateUserDTO.password,
        user.password
      );
      if (!isPasswordValid) {
        throw CustomError.unauthorized("Contraseña incorrecta.");
      }

      // Generar token JWT
      const token = this.tokenService.generateToken(user.id);

      console.log("Usuario autenticado correctamente: ", user);

      return {
        success: true,
        message: "Usuario autenticado exitosamente.",
        token,
      };
    } catch (error: any) {
      console.error("Error al autenticar usuario: ", error);
      return {
        success: false,
        message: error.message || "Error al autenticar usuario.",
      };
    }
  }
}
