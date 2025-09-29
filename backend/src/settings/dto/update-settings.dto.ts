import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateSettingsDto {
  @ApiPropertyOptional({ example: 'کالا مارکت', description: 'نام سایت' })
  @IsOptional()
  @IsString()
  site_name?: string;

  @ApiPropertyOptional({ example: 'فروشگاه اینترنتی کالا مارکت', description: 'توضیحات سایت' })
  @IsOptional()
  @IsString()
  site_description?: string;

  @ApiPropertyOptional({ example: 0.09, description: 'درصد مالیات (۰ تا ۱)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  tax_rate?: number;

  @ApiPropertyOptional({ example: 500000, description: 'حداقل مبلغ برای ارسال رایگان' })
  @IsOptional()
  @IsNumber()
  free_shipping_threshold?: number;

  @ApiPropertyOptional({ example: 50000, description: 'هزینه ارسال' })
  @IsOptional()
  @IsNumber()
  shipping_cost?: number;
}
