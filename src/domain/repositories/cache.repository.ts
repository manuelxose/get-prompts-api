import { PaginatedPrompt } from "../../application/interfaces/prompt/PaginatedPrompt";
import { PromptEntity } from "../entities/prompt";

export abstract class CacheRepository {
  abstract get<T>(key: string): Promise<PaginatedPrompt<PromptEntity> | null>;
  abstract set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  abstract delete(key: string): Promise<void>;
}
