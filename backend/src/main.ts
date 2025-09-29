import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import * as compression from "compression";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'", "https://api.stripe.com"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // Compression
  app.use(compression());

  // CORS configuration
  // app.enableCors({
  //   origin: [
  //     "http://localhost:3000",
  //     "https://kala-market.vercel.app",
  //     "https://urban-happiness-qpgvg56p4gq29qwg-3000.app.github.dev", // فرانت
  //     "https://3001-urban-happiness-qpgvg56p4gq29qwg-3000.app.github.dev", // بک‌اند
  //     configService.get("FRONTEND_URL"),
  //   ].filter(Boolean),
  //   credentials: true,
  //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  //   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  // });

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://kala-market.vercel.app",
      "https://urban-happiness-qpgvg56p4gq29qwg-3000.app.github.dev",
      configService.get("FRONTEND_URL"),
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["*"],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle("Kala Market API")
    .setDescription("E-commerce platform API with Clean Architecture")
    .setVersion("1.0")
    .addServer("/api/v1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
    .addTag("Authentication", "User authentication and authorization")
    .addTag("Users", "User management operations")
    .addTag("Products", "Product catalog management")
    .addTag("Categories", "Product categories")
    .addTag("Brands", "Product brands")
    .addTag("Cart", "Shopping cart operations")
    .addTag("Orders", "Order management")
    .addTag("Payments", "Payment processing")
    .addTag("Reviews", "Product reviews and ratings")
    .addTag("Wishlist", "User wishlist management")
    .addTag("Admin", "Administrative operations")
    .build();

  // Global prefix

  const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup("api/docs", app, document);
  app.setGlobalPrefix("api/v1");

  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });

  // // Global prefix
  // app.setGlobalPrefix("api/v1");

  app.getHttpAdapter().get("/", (req, res) => {
    res.send("Server is running");
  });

  const port = configService.get("PORT") || 3001;
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();

// import { NestFactory } from "@nestjs/core"
// import { ValidationPipe } from "@nestjs/common"
// import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
// import { AppModule } from "./app.module"

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)

//   // Global validation pipe
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   )

//   // Enable CORS
//   app.enableCors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })

//   // Swagger documentation
//   const config = new DocumentBuilder()
//     .setTitle("Kala Market API")
//     .setDescription("E-commerce API for Kala Market")
//     .setVersion("1.0")
//     .addBearerAuth()
//     .build()

//   const document = SwaggerModule.createDocument(app, config)
//   SwaggerModule.setup("api/docs", app, document)

//   const port = process.env.PORT || 3001
//   await app.listen(port)
//   console.log(`🚀 Server running on http://localhost:${port}`)
//   console.log(`📚 API Documentation: http://localhost:${port}/api/docs`)
// }
// bootstrap()
