// src/data/mongodb/models/AuthModel.ts

import { Schema, model, Document } from "mongoose";
import { AuthMethod } from "../../../domain/enums";

export interface IRefreshToken {
  id?: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface IAuth extends Document {
  id: string; // UUID
  userId: string; // Referencia al UserEntity
  method: AuthMethod; // EMAIL, GOOGLE, APPLE, etc.
  providerId?: string; // ID proporcionado por el proveedor (por ejemplo, Google ID)
  email?: string; // Solo para métodos de autenticación por email
  password?: string; // Solo para métodos de autenticación por email
  emailVerified: boolean;
  refreshTokens: IRefreshToken[];
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const AuthSchema = new Schema<IAuth>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    method: { type: String, enum: Object.values(AuthMethod), required: true },
    providerId: { type: String },
    email: { type: String },
    password: { type: String },
    emailVerified: { type: Boolean, required: true, default: false },
    refreshTokens: { type: [RefreshTokenSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const AuthModel = model<IAuth>("Auth", AuthSchema);
