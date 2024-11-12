// src/infrastructure/adapters/GoogleAuthAdapter.ts

import { OAuth2Client } from "google-auth-library";
import { env } from "../../core/config/env";
import { CustomError } from "../../domain/errors";

export class GoogleAuthAdapter {
  private oauthClient: OAuth2Client;

  constructor() {
    this.oauthClient = new OAuth2Client(
      env.googleClientId,
      env.googleClientSecret,
      env.googleRedirectUri
    );

    // Manejar eventos de tokens
    this.oauthClient.on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        // Almacenar el refresh_token de forma segura
        console.log("Nuevo refresh_token:", tokens.refresh_token);
      }
      console.log("Nuevo access_token:", tokens.access_token);
    });
  }

  async getTokens(code: string): Promise<any> {
    try {
      console.log("Obteniendo tokens con el código:", code);

      const { tokens } = await this.oauthClient.getToken(code);

      // Configurar las credenciales en el cliente OAuth2
      this.oauthClient.setCredentials(tokens);

      return tokens;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new CustomError(
          `Error al obtener tokens de Google: ${
            error.response.data.error_description || error.response.data.error
          }`,
          error.response.status
        );
      } else {
        throw CustomError.serverError(
          "Error desconocido al obtener tokens de Google."
        );
      }
    }
  }

  async getUserInfo(tokens: {
    access_token: string;
    id_token: string;
  }): Promise<any> {
    try {
      // Validar el id_token
      const ticket = await this.oauthClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: env.googleClientId,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        throw CustomError.serverError("El payload del ID token es inválido.");
      }

      // Obtener información adicional del access_token
      const tokenInfo = await this.oauthClient.getTokenInfo(
        tokens.access_token
      );

      return {
        ...payload,
        scopes: tokenInfo.scopes,
      };
    } catch (error: any) {
      if (error.message.includes("Invalid ID token")) {
        throw CustomError.serverError("ID token inválido.");
      } else if (error.response && error.response.data) {
        throw new CustomError(
          `Error al obtener información del usuario: ${error.response.data.error}`,
          error.response.status
        );
      } else {
        throw CustomError.serverError(
          "Error desconocido al obtener información del usuario."
        );
      }
    }
  }
}
