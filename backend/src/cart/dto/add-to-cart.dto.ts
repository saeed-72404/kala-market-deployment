import { IsString, IsNumber, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class AddToCartDto {
  @ApiProperty()
  @IsString()
  productId!: string

  @ApiProperty({ minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity!: number
}
