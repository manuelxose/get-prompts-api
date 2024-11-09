// src/application/use-cases/user/GetUserProfile.ts

import { FindUserByIdDTO } from "../../../domain/dtos/user";
import { CustomError } from "../../../domain/errors";
import { UserRepository } from "../../../domain/repositories";
import { GetUserProfileResponse } from "../../interfaces/user/GetUserProfileResponse";

export class GetUserProfileById {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: FindUserByIdDTO): Promise<GetUserProfileResponse> {
    try {
      console.log("Obtención de perfil de usuario: ", dto);

      // Obtener el perfil del usuario por ID
      const user = await this.userRepository.findById(dto);
      if (!user) {
        throw CustomError.notFound("Usuario no encontrado.");
      }

      console.log("Perfil de usuario obtenido correctamente: ", user.id);

      return {
        success: true,
        message: "Perfil de usuario obtenido exitosamente.",
        user,
      };
    } catch (error: any) {
      console.error("Error al obtener perfil de usuario: ", error);
      return {
        success: false,
        message: error.message || "Error al obtener el perfil de usuario.",
      };
    }
  }
}
