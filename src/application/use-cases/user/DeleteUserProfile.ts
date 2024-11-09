// src/application/use-cases/user/DeleteUserAccount.ts

import { DeleteUserDTO } from "../../../domain/dtos/user";
import { UserRepository } from "../../../domain/repositories";
import { DeleteUserAccountResponse } from "../../interfaces/user/DeleteUserAccountResponse";

export class DeleteUserProfile {
  constructor(private userRepository: UserRepository) {}

  async execute(
    DeleteUserDTO: DeleteUserDTO
  ): Promise<DeleteUserAccountResponse> {
    try {
      console.log("Eliminación de cuenta de usuario: ", DeleteUserDTO);

      // Eliminar la cuenta del usuario
      await this.userRepository.delete(DeleteUserDTO);

      console.log(
        "Cuenta de usuario eliminada correctamente: ",
        DeleteUserDTO.userId
      );

      return {
        success: true,
        message: "Cuenta de usuario eliminada exitosamente.",
      };
    } catch (error: any) {
      console.error("Error al eliminar cuenta de usuario: ", error);
      return {
        success: false,
        message: error.message || "Error al eliminar la cuenta de usuario.",
      };
    }
  }
}
