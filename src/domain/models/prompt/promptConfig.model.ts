// src/domain/interfaces/prompt/PromptConfig.ts

export interface PromptConfig {
  GPTConfig?: GPTConfig;
  DALLEConfig?: DALLEConfig;
  LeonardoAIConfig?: LeonardoAIConfig;
  LlamaConfig?: LlamaConfig;
  MidJourneyConfig?: MidJourneyConfig;
  PromptBaseConfig?: PromptBaseConfig;
  StableDiffusionConfig?: StableDiffusionConfig;
  BardConfig?: BardConfig;
}

export interface GPTConfig {
  type: "Completion" | "Chat";
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  engine: GPTEngine;
  previewInput: string;
  previewOutput: string;
  link: string;
  json: string; // JSON string for GPT configurations
}

export type GPTEngine =
  | "gpt-4-turbo"
  | "gpt-4"
  | "gpt-4-32k"
  | "gpt-3.5-turbo"
  | string;

export interface DALLEConfig {
  version: "DALL-E 2" | "DALL-E 3";
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  images?: string[]; // URLs of uploaded images
}

export interface LeonardoAIConfig {
  model: string; // e.g., 'Leonardo AI v1', 'Leonardo AI v2'
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  images: string[]; // URLs of uploaded images
}

export interface LlamaConfig {
  model: string; // e.g., 'Llama Model 1', 'Llama Model 2'
  prompt: string;
  testingPrompt: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  previewInput: string;
  previewOutput: string;
  promptInstructions: string;
}

export interface MidJourneyConfig {
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  images: string[]; // URLs of uploaded images
}

export interface PromptBaseConfig {
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  images: string[]; // URLs of uploaded images
}

export interface StableDiffusionConfig {
  model: string; // e.g., 'SD XL v1.0', 'SD v2.1'
  sampler: string; // e.g., 'DDIM', 'k_euler'
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  negativePrompt?: string;
  imageWidth: number;
  imageHeight: number;
  steps: number;
  cfgScale: number;
  clipGuidance?: boolean;
  seed?: number;
  images: string[]; // URLs of uploaded images
}

export interface BardConfig {
  prompt: string;
  testingPrompt: string;
  promptInstructions: string;
  images: string[]; // URLs of uploaded images
}
