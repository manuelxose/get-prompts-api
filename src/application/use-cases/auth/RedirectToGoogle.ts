// src/application/use-cases/auth/RedirectToGoogle.ts

import { authConfig } from "../../../core/config";
import { RedirectToGoogleDTO } from "../../../domain/dtos/auth/RedirectToGoogleDTO";

export class RedirectToGoogle {
  constructor() {}

  execute(dto: RedirectToGoogleDTO): { url: string } {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: authConfig.google.redirectUri,
      client_id: authConfig.google.clientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: authConfig.google.scope,
      state: dto.state || "default_state",
    };

    const qs = new URLSearchParams(options).toString();
    const url = `${rootUrl}?${qs}`;

    return { url };
  }
}
