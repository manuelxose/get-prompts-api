import { PaginatedPrompt } from "../../application/interfaces/prompt/PaginatedPrompt";
import { PromptEntity } from "../../domain/entities/prompt";
import { CacheRepository } from "../../domain/repositories";
import { CacheDataSource } from "../datasources";

export class CacheRedisRepository implements CacheRepository {
  constructor(private readonly cacheDataSource: CacheDataSource) {}

  async get<T>(key: string): Promise<PaginatedPrompt<PromptEntity> | null> {
    return this.cacheDataSource.get(key);
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    await this.cacheDataSource.set(key, value, ttlSeconds);
  }

  async delete(key: string): Promise<void> {
    await this.cacheDataSource.delete(key);
  }
}
