import { IsOptional, IsString, IsNumber, IsBoolean, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class ProductQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brandId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortBy?: string

  @ApiProperty({ required: false, enum: ["asc", "desc"] })
  @IsOptional()
  @IsEnum(["asc", "desc"])
  sortOrder?: "asc" | "desc"

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isFeatured?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean
}
