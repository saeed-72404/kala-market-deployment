import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Product ID to review' })
  @IsUUID()
  productId!: string;

  @ApiProperty({ description: 'Rating between 1 and 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty({ description: 'Review comment' })
  @IsString()
  comment!: string;
}
