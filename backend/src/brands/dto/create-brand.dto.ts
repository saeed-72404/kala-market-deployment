import { IsString, IsOptional, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateBrandDto {
  @ApiProperty()
  @IsString()
  name!: string

  @ApiProperty()
  @IsString()
  slug!: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaTitle?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaDescription?: string
}
