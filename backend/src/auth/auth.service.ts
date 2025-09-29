import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";

import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    // Hash password
    const hashedPassword = await hash(dto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    const token = await this.signToken(user.id, user.email);

    return {
      user,
      access_token: token,
    };
  }

  async login(dto: LoginDto) {
    console.log("Login attempt:", dto);

    // هش ذخیره‌شده در دیتابیس
    const plainPassword = "admin123456";
    const hashedPassword = await hash(plainPassword, 12); // cost factor = 12
    console.log("New hash:", hashedPassword);

    // Find user
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.identifier }, { phone: dto.identifier }],
        // isActive: true,
      },
    });

    console.log("Found user:", user);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Verify password

    console.log("dto.password => ", dto.password);
    console.log("user.password => ", user.password);
    const isPasswordValid = await compare(dto.password, user.password);

    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = await this.signToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      access_token: token,
    };
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload);
  }
}
