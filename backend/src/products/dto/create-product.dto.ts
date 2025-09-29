import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, ValidateNested, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export enum ProductStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export class ProductImageDto {
  @ApiProperty()
  @IsString()
  url?: string

  @ApiProperty()
  @IsString()
  alt?: string
}

export class ProductAttributeDto {
  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  value?: string
}

export class ProductVariantDto {
  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  value?: string

  @ApiProperty()
  @IsNumber()
  price?: number

  @ApiProperty()
  @IsNumber()
  stock?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  sku?: string
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  slug?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsString()
  sku?: string

  @ApiProperty()
  @IsNumber()
  price?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  salePrice?: number

  @ApiProperty()
  @IsNumber()
  stock?: number

  @ApiProperty()
  @IsString()
  categoryId?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  brandId?: string

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiProperty({ enum: ProductStatus })
  @IsEnum(ProductStatus)
  status?: ProductStatus

  @ApiProperty({ type: [ProductImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images?: ProductImageDto[]

  @ApiProperty({ type: [ProductAttributeDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributeDto)
  attributes?: ProductAttributeDto[]

  @ApiProperty({ type: [ProductVariantDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[]

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  weight?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  dimensions?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  metaTitle?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  metaDescription?: string
}
