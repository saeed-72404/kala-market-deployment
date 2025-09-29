import { Module, type MiddlewareConsumer, type NestModule } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler"
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core"
import { ScheduleModule } from "@nestjs/schedule"
import { CacheModule } from "@nestjs/cache-manager"
import { EventEmitterModule } from "@nestjs/event-emitter"
import * as redisStore from "cache-manager-redis-store"

// Core modules
import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"

// Feature modules
import { ProductsModule } from "./products/products.module"
import { CategoriesModule } from "./categories/categories.module"
import { BrandsModule } from "./brands/brands.module"
import { CartModule } from "./cart/cart.module"
import { OrdersModule } from "./orders/orders.module"
import { ReviewsModule } from "./reviews/reviews.module"
import { WishlistModule } from "./wishlist/wishlist.module"
// import { PaymentsModule } from "./payments/payments.module"

// Admin and utility modules
import { AdminModule } from "./admin/admin.module"
import { UploadModule } from "./upload/upload.module"
import { SettingsModule } from "./settings/settings.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { AnalyticsModule } from "./analytics/analytics.module"

// Guards and middleware
import { JwtGuard } from "./auth/guard"
import { RolesGuard } from "./auth/guard/roles.guard"

// Interceptors and filters
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor"
import { TransformInterceptor } from "./common/interceptors/transform.interceptor"
import { HttpExceptionFilter } from "./common/filters/http-exception.filter"
import { ValidationExceptionFilter } from "./common/filters/validation-exception.filter"

// Middleware
import { LoggerMiddleware } from "./common/middleware/logger.middleware"
import { SecurityMiddleware } from "./common/middleware/security.middleware"

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
      cache: true,
    }),

    // Caching with Redis
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get("REDIS_HOST", "localhost"),
        port: configService.get("REDIS_PORT", 6379),
        password: configService.get("REDIS_PASSWORD"),
        ttl: 300, // 5 minutes default TTL
        max: 1000, // Maximum number of items in cache
      }),
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: "short",
          ttl: 1000, // 1 second
          limit: 10, // 10 requests per second
        },
        {
          name: "medium",
          ttl: 60000, // 1 minute
          limit: 100, // 100 requests per minute
        },
        {
          name: "long",
          ttl: 3600000, // 1 hour
          limit: 1000, // 1000 requests per hour
        },
      ],
    }),

    // Task scheduling
    ScheduleModule.forRoot(),

    // Event system
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: ".",
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),

    // Core modules
    PrismaModule,
    AuthModule,
    UsersModule,

    // Feature modules
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    CartModule,
    OrdersModule,
    ReviewsModule,
    WishlistModule,
    // PaymentsModule,

    // Admin and utility modules
    AdminModule,
    UploadModule,
    SettingsModule,
    NotificationsModule,
    AnalyticsModule,
  ],
  providers: [
    // Global guards
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },

    // Global exception filters
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, SecurityMiddleware).forRoutes("*")
  }
}
