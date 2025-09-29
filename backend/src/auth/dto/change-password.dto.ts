import { IsString, MinLength, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ChangePasswordDto {
  @ApiProperty({
    example: "currentPassword123",
    description: "Current password",
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string

  @ApiProperty({
    example: "newPassword123",
    description: "New password (minimum 6 characters)",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword: string
}
