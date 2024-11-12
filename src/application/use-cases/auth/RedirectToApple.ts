// src/application/use-cases/auth/RedirectToApple.ts

import { authConfig } from "../../../core/config/authConfig";
import { RedirectToAppleDTO } from "../../../domain/dtos/auth/RedirectToAppleDTO";
import { CustomError } from "../../../domain/errors";
import { RedirectToAppleResponse } from "../../interfaces/auth";

export class RedirectToApple {
  /**
   * Genera la URL de redirección de autenticación para Apple.
   * @param dto - DTO con parámetros de redirección.
   * @returns URL de redirección para iniciar la autenticación con Apple.
   */
  async execute(dto: RedirectToAppleDTO): Promise<RedirectToAppleResponse> {
    try {
      // Parámetros necesarios para la autenticación de Apple
      const url = new URL("https://appleid.apple.com/auth/authorize");
      url.searchParams.append("response_type", "code");
      url.searchParams.append("client_id", authConfig.apple.clientId);
      url.searchParams.append("redirect_uri", authConfig.apple.redirectUri);
      url.searchParams.append("scope", authConfig.apple.scope);
      url.searchParams.append("state", dto.state || "default_state");

      return { url: url.toString() };
    } catch (error: any) {
      throw CustomError.badRequest(
        "Error generando la URL de autenticación de Apple"
      );
    }
  }
}
