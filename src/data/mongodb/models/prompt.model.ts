// src/data/mongodb/models/prompt.model.ts

import { Schema, model, Document } from "mongoose";
import { PromptCategory, CountryCode } from "../../../domain/enums";
import { PromptConfig } from "../../../domain/models/prompt";

interface GPTConfigSchema {
  type: "Completion" | "Chat";
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  engine: string;
  previewInput: string;
  previewOutput: string;
  link: string;
  json: string;
}

interface DALLEConfigSchema {
  version: "DALL-E 2" | "DALL-E 3";
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  images: string[];
}

export interface PromptDocument extends Document {
  userId: string;
  category: PromptCategory;
  name: string;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  customPrice?: number;
  country: CountryCode;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  views: number;
  likes: number;
  config: PromptConfig;
  images: string[];
  ratings?: any[]; // Define adecuadamente si implementas ratings
  reviews?: any[]; // Define adecuadamente si implementas reviews
  salesCount?: number;
}

const GPTConfigSchema = new Schema<GPTConfigSchema>({
  type: { type: String, enum: ["Completion", "Chat"], required: true },
  prompt: { type: String, required: true },
  testingPrompt: { type: String, required: true },
  promptInstructions: { type: String, required: true },
  engine: { type: String, required: true },
  previewInput: { type: String, required: true },
  previewOutput: { type: String, required: true },
  link: { type: String, required: true },
  json: { type: String, required: true },
});

const DALLEConfigSchema = new Schema<DALLEConfigSchema>({
  version: { type: String, enum: ["DALL-E 2", "DALL-E 3"], required: true },
  prompt: { type: String, required: true },
  testingPrompt: { type: String, required: true },
  promptInstructions: { type: String, required: true },
  images: [{ type: String, required: true }],
});

const PromptSchema = new Schema<PromptDocument>(
  {
    userId: { type: String, ref: "User", required: true },
    category: {
      type: String,
      enum: Object.values(PromptCategory),
      required: true,
    },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    price: { type: Number, required: true },
    customPrice: { type: Number },
    country: { type: String, enum: Object.values(CountryCode), required: true },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    config: { type: Schema.Types.Mixed, required: true }, // Puedes especificar sub-esquemas según la categoría
    images: [{ type: String, required: true }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    salesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PromptModel = model<PromptDocument>("Prompt", PromptSchema);
