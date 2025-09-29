import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoryDto {
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
  image?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parentId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaTitle?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaDescription?: string
}
