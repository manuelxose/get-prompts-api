// src/data/mongodb/models/AuthModel.ts

import { Schema, model, Document } from "mongoose";
import { AuthMethod } from "../../../domain/enums";

export interface IAuth extends Document {
  _id: string; // UUID
  userId: string; // Referencia al UserEntity
  method: AuthMethod; // EMAIL, GOOGLE, APPLE, etc.
  providerId?: string; // ID proporcionado por el proveedor (por ejemplo, Google ID)
  email?: string; // Solo para métodos de autenticación por email
  password?: string; // Solo para métodos de autenticación por email
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AuthSchema = new Schema<IAuth>(
  {
    _id: { type: String, required: true }, // UUID
    userId: { type: String, required: true, index: true },
    method: {
      type: String,
      enum: Object.values(AuthMethod),
      required: true,
      index: true,
    },
    providerId: { type: String },
    email: { type: String },
    password: { type: String },
    emailVerified: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const AuthModel = model<IAuth>("Auth", AuthSchema);
