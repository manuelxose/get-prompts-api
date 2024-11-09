// src/domain/interfaces/prompt/Rating.ts

export interface Rating {
  userId: string;
  score: number; // e.g., 1 to 5
  comment?: string;
  ratedAt: string; // ISO date string
}
