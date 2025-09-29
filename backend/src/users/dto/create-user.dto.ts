import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  CUSTOMER = "CUSTOMER",
}

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email?: string

  @ApiProperty()
  @IsString()
  phone?: string

  @ApiProperty()
  @IsString()
  firstName?: string

  @ApiProperty()
  @IsString()
  lastName?: string

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean; 

  @ApiProperty({ enum: UserRole, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole
}
