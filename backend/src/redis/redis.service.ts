import { Injectable, Logger, type OnModuleInit, type OnModuleDestroy } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import Redis, { ChainableCommander, Pipeline, RedisOptions } from "ioredis"

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name)
  private client!: Redis

  constructor(private configService: ConfigService) { }

  async onModuleInit() {
    try {
      const options: RedisOptions = {
        host: this.configService.get("REDIS_HOST", "localhost"),
        port: this.configService.get("REDIS_PORT", 6379),
        password: this.configService.get("REDIS_PASSWORD"),
        db: this.configService.get("REDIS_DB", 0),
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        family: 4,
        keyPrefix: this.configService.get("REDIS_KEY_PREFIX", "kala-market:"),
        retryStrategy(times) {
          return Math.min(times * 50, 2000)
        },
      }

      this.client = new Redis(options)

      this.client.on("connect", () => {
        this.logger.log("Connected to Redis")
      })

      this.client.on("error", (error) => {
        this.logger.error("Redis connection error:", error)
      })

      this.client.on("ready", () => {
        this.logger.log("Redis client ready")
      })

      await this.client.connect()
    } catch (error) {
      this.logger.error("Failed to connect to Redis:", error)
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit()
      this.logger.log("Redis connection closed")
    }
  }

  // Basic operations
  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key)
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error)
      return null
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value)
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error)
    }
  }

  async setex(key: string, seconds: number, value: string): Promise<void> {
    try {
      await this.client.setex(key, seconds, value)
    } catch (error) {
      this.logger.error(`Error setting key ${key} with expiration:`, error)
    }
  }

  async del(...keys: string[]): Promise<number> {
    try {
      return await this.client.del(...keys)
    } catch (error) {
      this.logger.error(`Error deleting keys:`, error)
      return 0
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key)
      return result === 1
    } catch (error) {
      this.logger.error(`Error checking existence of key ${key}:`, error)
      return false
    }
  }

  async keys(pattern: string): Promise<string[]> {
    try {
      return await this.client.keys(pattern)
    } catch (error) {
      this.logger.error(`Error getting keys with pattern ${pattern}:`, error)
      return []
    }
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      const result = await this.client.expire(key, seconds)
      return result === 1
    } catch (error) {
      this.logger.error(`Error setting expiration for key ${key}:`, error)
      return false
    }
  }

  async ttl(key: string): Promise<number> {
    try {
      return await this.client.ttl(key)
    } catch (error) {
      this.logger.error(`Error getting TTL for key ${key}:`, error)
      return -1
    }
  }

  // Hash operations
  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await this.client.hget(key, field)
    } catch (error) {
      this.logger.error(`Error getting hash field ${field} from ${key}:`, error)
      return null
    }
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    try {
      await this.client.hset(key, field, value)
    } catch (error) {
      this.logger.error(`Error setting hash field ${field} in ${key}:`, error)
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return await this.client.hgetall(key)
    } catch (error) {
      this.logger.error(`Error getting all hash fields from ${key}:`, error)
      return {}
    }
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    try {
      return await this.client.hdel(key, ...fields)
    } catch (error) {
      this.logger.error(`Error deleting hash fields from ${key}:`, error)
      return 0
    }
  }

  // List operations
  async lpush(key: string, ...values: string[]): Promise<number> {
    try {
      return await this.client.lpush(key, ...values)
    } catch (error) {
      this.logger.error(`Error pushing to list ${key}:`, error)
      return 0
    }
  }

  async rpop(key: string): Promise<string | null> {
    try {
      return await this.client.rpop(key)
    } catch (error) {
      this.logger.error(`Error popping from list ${key}:`, error)
      return null
    }
  }

  async llen(key: string): Promise<number> {
    try {
      return await this.client.llen(key)
    } catch (error) {
      this.logger.error(`Error getting list length ${key}:`, error)
      return 0
    }
  }

  // Set operations
  async sadd(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.sadd(key, ...members)
    } catch (error) {
      this.logger.error(`Error adding to set ${key}:`, error)
      return 0
    }
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.srem(key, ...members)
    } catch (error) {
      this.logger.error(`Error removing from set ${key}:`, error)
      return 0
    }
  }

  async smembers(key: string): Promise<string[]> {
    try {
      return await this.client.smembers(key)
    } catch (error) {
      this.logger.error(`Error getting set members ${key}:`, error)
      return []
    }
  }

  async sismember(key: string, member: string): Promise<boolean> {
    try {
      const result = await this.client.sismember(key, member)
      return result === 1
    } catch (error) {
      this.logger.error(`Error checking set membership ${key}:`, error)
      return false
    }
  }

  // Sorted set operations
  async zadd(key: string, score: number, member: string): Promise<number> {
    try {
      return await this.client.zadd(key, score, member)
    } catch (error) {
      this.logger.error(`Error adding to sorted set ${key}:`, error)
      return 0
    }
  }

  async zrange(key: string, start: number, stop: number): Promise<string[]> {
    try {
      return await this.client.zrange(key, start, stop)
    } catch (error) {
      this.logger.error(`Error getting sorted set range ${key}:`, error)
      return []
    }
  }

  async zrevrange(key: string, start: number, stop: number): Promise<string[]> {
    try {
      return await this.client.zrevrange(key, start, stop)
    } catch (error) {
      this.logger.error(`Error getting reverse sorted set range ${key}:`, error)
      return []
    }
  }

  async zrem(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.zrem(key, ...members)
    } catch (error) {
      this.logger.error(`Error removing from sorted set ${key}:`, error)
      return 0
    }
  }

  // Cache helper methods
  async cacheGet<T>(key: string): Promise<T | null> {
    try {
      const value = await this.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      this.logger.error(`Error parsing cached value for key ${key}:`, error)
      return null
    }
  }

  async cacheSet<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value)
      if (ttl) {
        await this.setex(key, ttl, serialized)
      } else {
        await this.set(key, serialized)
      }
    } catch (error) {
      this.logger.error(`Error caching value for key ${key}:`, error)
    }
  }

  // Pub/Sub operations
  async publish(channel: string, message: string): Promise<number> {
    try {
      return await this.client.publish(channel, message)
    } catch (error) {
      this.logger.error(`Error publishing to channel ${channel}:`, error)
      return 0
    }
  }

  // Transaction support
  // async multi(): Promise<Redis.Pipeline> {
  //   return this.client.multi()
  // }

  async multi(): Promise<ChainableCommander> {
    return this.client.multi()
  }

  // Lua script execution
  async eval(script: string, numKeys: number, ...args: (string | number)[]): Promise<any> {
    try {
      return await this.client.eval(script, numKeys, ...args)
    } catch (error) {
      this.logger.error("Error executing Lua script:", error)
      throw error
    }
  }

  // Health check
  async ping(): Promise<string> {
    try {
      return await this.client.ping()
    } catch (error) {
      this.logger.error("Redis ping failed:", error)
      throw error
    }
  }

  // Get Redis client for advanced operations
  getClient(): Redis {
    return this.client
  }
}
