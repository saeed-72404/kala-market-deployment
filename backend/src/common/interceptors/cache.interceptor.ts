import { Injectable, type NestInterceptor, type ExecutionContext, type CallHandler, Logger } from "@nestjs/common"
import { type Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import type { RedisService } from "../../redis/redis.service"
import type { Reflector } from "@nestjs/core"

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheInterceptor.name)

  constructor(
    private redis: RedisService,
    private reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    // Only cache GET requests
    if (request.method !== "GET") {
      return next.handle()
    }

    // Get cache configuration from decorator
    const cacheTTL = this.reflector.get<number>("cache-ttl", context.getHandler()) || 300 // 5 minutes default
    const cacheKey = this.reflector.get<string>("cache-key", context.getHandler())

    if (!cacheKey) {
      return next.handle()
    }

    // Generate cache key
    const fullCacheKey = this.generateCacheKey(cacheKey, request)

    try {
      // Try to get from cache
      const cachedResult = await this.redis.cacheGet(fullCacheKey)

      if (cachedResult) {
        this.logger.debug(`Cache hit: ${fullCacheKey}`)

        // Set cache headers
        response.setHeader("X-Cache", "HIT")
        response.setHeader("Cache-Control", `public, max-age=${cacheTTL}`)

        return of(cachedResult)
      }

      this.logger.debug(`Cache miss: ${fullCacheKey}`)

      // Set cache headers for miss
      response.setHeader("X-Cache", "MISS")
      response.setHeader("Cache-Control", `public, max-age=${cacheTTL}`)

      return next.handle().pipe(
        tap(async (data) => {
          // Cache the response
          await this.redis.cacheSet(fullCacheKey, data, cacheTTL)
          this.logger.debug(`Cached response: ${fullCacheKey}`)
        }),
      )
    } catch (error) {
      this.logger.error(`Cache error for key ${fullCacheKey}:`, error)
      return next.handle()
    }
  }

  private generateCacheKey(baseKey: string, request: any): string {
    const url = request.url
    const query = JSON.stringify(request.query)
    const user = request.user?.id || "anonymous"

    return `${baseKey}:${Buffer.from(`${url}:${query}:${user}`).toString("base64")}`
  }
}
