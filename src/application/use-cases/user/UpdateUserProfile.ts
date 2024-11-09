// src/application/use-cases/user/UpdateUserProfile.ts

import { UpdateUserDTO } from "../../../domain/dtos/user";
import { UserRepository } from "../../../domain/repositories";
import { UpdateUserProfileResponse } from "../../interfaces/user/UpdateUserProfileResponse";

export class UpdateUserProfile {
  constructor(private userRepository: UserRepository) {}

  async execute(
    updateUserProfileDTO: UpdateUserDTO
  ): Promise<UpdateUserProfileResponse> {
    try {
      console.log("Actualización de perfil de usuario: ", updateUserProfileDTO);

      // Actualizar el perfil del usuario
      const updatedUser = await this.userRepository.update(
        updateUserProfileDTO
      );

      console.log(
        "Perfil de usuario actualizado correctamente: ",
        updatedUser.id
      );

      return {
        success: true,
        message: "Perfil de usuario actualizado exitosamente.",
        user: updatedUser,
      };
    } catch (error: any) {
      console.error("Error al actualizar perfil de usuario: ", error);
      return {
        success: false,
        message: error.message || "Error al actualizar el perfil de usuario.",
      };
    }
  }
}
