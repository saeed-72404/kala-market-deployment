import { IsOptional, IsString, IsNumber, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { OrderStatus, PaymentStatus } from "./update-order-status.dto"

export class OrderQueryDto {
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

  @ApiProperty({ required: false, enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus

  @ApiProperty({ required: false, enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortBy?: string

  @ApiProperty({ required: false, enum: ["asc", "desc"] })
  @IsOptional()
  @IsEnum(["asc", "desc"])
  sortOrder?: "asc" | "desc"
}
