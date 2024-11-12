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
  createdAt: Date;
  updatedAt: Date;

  constructor(
    idOrProps:
      | string
      | {
          id: string;
          userId: string;
          method: AuthMethod;
          emailVerified: boolean;
          createdAt: Date;
          updatedAt: Date;
          password?: string;
          providerId?: string;
          email?: string;
        },
    userId?: string,
    method?: AuthMethod,
    emailVerified?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    password?: string,
    providerId?: string,
    email?: string
  ) {
    if (typeof idOrProps === "string") {
      // Constructor llamado con parámetros individuales
      this.id = idOrProps;
      this.userId = userId!;
      this.method = method!;
      this.emailVerified = emailVerified!;
      this.createdAt = createdAt!;
      this.updatedAt = updatedAt!;
      this.password = password;
      this.providerId = providerId;
      this.email = email;
    } else {
      // Constructor llamado con un objeto
      const props = idOrProps;
      this.id = props.id;
      this.userId = props.userId;
      this.method = props.method;
      this.emailVerified = props.emailVerified;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
      this.password = props.password;
      this.providerId = props.providerId;
      this.email = props.email;
    }
  }
}
