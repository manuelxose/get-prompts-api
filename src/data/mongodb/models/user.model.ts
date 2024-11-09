// src/data/mongodb/models/UserModel.ts

import { Schema, model, Document } from "mongoose";
import { UserRole, CountryCode } from "../../../domain/enums";

export interface IUser extends Document {
  id: string; // UUID
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  isSeller: boolean;
  promptsPublished: string[];
  paymentMethods: string[];
  promptsBought: string[];
  nickName?: string;
  stripeId?: string;
  promptsLiked?: string[];
  views?: number;
  followers?: string[];
  rank?: number;
  bio?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  bannerURL?: string;
  following?: string[];
  allowMessages?: boolean;
  acceptCustomJobs?: boolean;
  role: UserRole;
  countryCode?: CountryCode;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    photoURL: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isSeller: { type: Boolean, required: true },
    promptsPublished: { type: [String], default: [] },
    paymentMethods: { type: [String], default: [] },
    promptsBought: { type: [String], default: [] },
    nickName: { type: String },
    stripeId: { type: String },
    promptsLiked: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    followers: { type: [String], default: [] },
    rank: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
    website: { type: String, default: "" },
    bannerURL: { type: String, default: "" },
    following: { type: [String], default: [] },
    allowMessages: { type: Boolean, default: true },
    acceptCustomJobs: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(UserRole), required: true },
    countryCode: { type: String, enum: Object.values(CountryCode) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model<IUser>("User", UserSchema);
