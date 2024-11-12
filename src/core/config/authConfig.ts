// src/core/config/authConfig.ts
import { env } from "../../core/config/env";

export const authConfig = {
  google: {
    clientId: env.googleClientId!,
    clientSecret: env.googleClientSecret!,
    redirectUri: env.googleRedirectUri!,
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  },
  apple: {
    clientId: process.env.APPLE_CLIENT_ID!,
    teamId: process.env.APPLE_TEAM_ID!,
    keyId: process.env.APPLE_KEY_ID!,
    privateKey: process.env.APPLE_PRIVATE_KEY!,
    redirectUri: process.env.APPLE_REDIRECT_URI!,
    scope: "name email",
  },
};
