// src/data/mongodb/models/RefreshTokenModel.ts

import { Schema, model, Document } from "mongoose";
import { TokenType } from "../../../domain/enums";

export interface IRefreshToken extends Document {
  userId: string;
  token: string;
  type: TokenType;
  expiresAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true, unique: true },
    type: { type: String, enum: Object.values(TokenType), required: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

// Índice compuesto para acelerar las búsquedas y asegurar unicidad
RefreshTokenSchema.index({ userId: 1, token: 1 }, { unique: true });

// Índice TTL para eliminación automática de tokens expirados
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);
