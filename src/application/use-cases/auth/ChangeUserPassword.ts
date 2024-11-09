import { AuthRepository, UserRepository } from "../../../domain/repositories";
import { ChangeUserPasswordResponse } from "../../interfaces/user";
import { CustomError } from "../../../domain/errors";
import { BcryptAdapter } from "../../../core/adapters";

export class ChangeUserPassword {
  private bcrypt: BcryptAdapter = new BcryptAdapter();

  constructor(private authRepository: AuthRepository) {}

  //TODO: Cambiar a DTO

  async execute(
    changeUserPasswordDTO: any
  ): Promise<ChangeUserPasswordResponse> {
    try {
      console.log("Cambio de contraseña de usuario: ", changeUserPasswordDTO);

      // Obtener el usuario por ID
      const user = await this.authRepository.getActiveUser(
        changeUserPasswordDTO.userId
      );
      if (!user) {
        throw CustomError.notFound(
          `Usuario con ID ${changeUserPasswordDTO.userId} no encontrado.`
        );
      }

      // Comparar la contraseña actual
      const isPasswordValid = await this.bcrypt.compare(
        changeUserPasswordDTO.currentPassword,
        user.password!
      );
      if (!isPasswordValid) {
        throw CustomError.unauthorized("Contraseña actual incorrecta.");
      }

      // Hashear la nueva contraseña
      const hashedNewPassword = await this.bcrypt.hash(
        changeUserPasswordDTO.newPassword
      );

      // Actualizar la contraseña del usuario
      user.password = hashedNewPassword;
      user.updatedAt = new Date();

      // Guardar los cambios en el repositorio
      await this.authRepository.updatePassword(user as any);

      console.log("Contraseña de usuario actualizada correctamente: ", user);

      return {
        success: true,
        message: "Contraseña actualizada exitosamente.",
      };
    } catch (error: any) {
      console.error("Error al cambiar la contraseña: ", error);
      return {
        success: false,
        message: error.message || "Error al cambiar la contraseña.",
      };
    }
  }
}
