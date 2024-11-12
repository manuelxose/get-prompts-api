// src/core/adapters/appleAuthAdapter.ts

import axios from "axios";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/authConfig";

export class AppleAuthAdapter {
  generateClientSecret(): string {
    const headers = {
      alg: "ES256",
      kid: authConfig.apple.keyId,
    };

    const claims = {
      iss: authConfig.apple.teamId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 15777000, // 6 meses
      aud: "https://appleid.apple.com",
      sub: authConfig.apple.clientId,
    };

    const clientSecret = jwt.sign(claims, authConfig.apple.privateKey, {
      algorithm: "ES256",
      header: headers,
    });

    return clientSecret;
  }

  async getTokens(code: string): Promise<any> {
    const clientSecret = this.generateClientSecret();

    const url = "https://appleid.apple.com/auth/token";
    const values = {
      grant_type: "authorization_code",
      code,
      redirect_uri: authConfig.apple.redirectUri,
      client_id: authConfig.apple.clientId,
      client_secret: clientSecret,
    };

    const res = await axios.post(url, new URLSearchParams(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  }

  decodeIdToken(idToken: string): any {
    const decoded = jwt.decode(idToken, { complete: true });
    return decoded?.payload;
  }
}
