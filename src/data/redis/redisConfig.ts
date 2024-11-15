// src/data/redis/redisConfig.ts
import Redis from "ioredis";
import { env } from "../../core/config/env";

export class RedisConfig {
  private static instance: RedisConfig;
  private client: Redis; // Instancia de Redis

  private constructor() {
    this.client = new Redis({
      host: env.redisHost,
      port: env.redisPort,
      // password: env.redisPassword,
    });

    // Manejar errores en la conexión de Redis
    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });
  }

  // Método para obtener la instancia del cliente Redis
  public static getClient(): Redis {
    if (!RedisConfig.instance) {
      RedisConfig.instance = new RedisConfig();
    }
    return RedisConfig.instance.client;
  }
}
