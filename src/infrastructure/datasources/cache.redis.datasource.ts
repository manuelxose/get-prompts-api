// src/data/redis/RedisDataSource.ts
import Redis from "ioredis";
import { RedisConfig } from "../../data/redis/redisConfig";
import { CacheDataSource } from "../../domain/datasources";

class RedisDataSource implements CacheDataSource {
  private client = RedisConfig.getClient();

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const stringValue = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, stringValue, "EX", ttlSeconds);
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async delete(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(keys);
    }
  }
}

export { RedisDataSource as CacheDataSource };
