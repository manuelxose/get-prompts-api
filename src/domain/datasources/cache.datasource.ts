export abstract class CacheDataSource {
  abstract get(key: string): Promise<any>;
  abstract set(key: string, value: any, ttl: number): Promise<void>;
  abstract delete(key: string): Promise<void>;
}
