// src/domain/entities/auth/AuthEntity.ts

import { AuthMethod } from "../../enums";

export class AuthEntity {
  id: string; // UUID
  userId: string; // Referencia al UserEntity
  method: AuthMethod; // EMAIL, GOOGLE, APPLE, etc.
  providerId?: string; // ID proporcionado por el proveedor (por ejemplo, Google ID)
  email?: string; // Solo para métodos de autenticación por email
  password?: string; // Solo para métodos de autenticación por email
  emailVerified: boolean;
  refreshTokens: RefreshToken[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    method: AuthMethod,
    emailVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
    password?: string,
    providerId?: string,
    email?: string,
    refreshTokens: RefreshToken[] = []
  ) {
    this.id = id;
    this.userId = userId;
    this.method = method;
    this.password = password;
    this.providerId = providerId;
    this.email = email;
    this.emailVerified = emailVerified;
    this.refreshTokens = refreshTokens;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class RefreshToken {
  token: string;
  expiresAt: Date;
  createdAt: Date;

  constructor(token: string, expiresAt: Date, createdAt: Date) {
    this.token = token;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
