import { IsString, IsOptional, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  title?: string

  @ApiProperty()
  @IsString()
  firstName?: string

  @ApiProperty()
  @IsString()
  lastName?: string

  @ApiProperty()
  @IsString()
  phone?: string

  @ApiProperty()
  @IsString()
  address?: string

  @ApiProperty()
  @IsString()
  city?: string

  @ApiProperty()
  @IsString()
  state?: string

  @ApiProperty()
  @IsString()
  postalCode?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}
