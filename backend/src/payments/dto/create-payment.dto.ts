// import { ApiProperty } from "@nestjs/swagger";
// import { IsString, IsNumber, IsOptional, IsEnum } from "class-validator";
// // import { PaymentMethod, PaymentStatus } from "@prisma/client";
// // import { PaymentMethodEnum } from "../payment.enums";

// export class CreatePaymentDto {
//   @ApiProperty()
//   @IsString()
//   orderId!: string;

//   @ApiProperty({ enum: PaymentMethodEnum })
//   @IsEnum(PaymentMethodEnum)
//   method!: PaymentMethodEnum;

//   @ApiProperty()
//   @IsNumber()
//   amount!: number;

//   @ApiProperty({ required: false })
//   @IsString()
//   @IsOptional()
//   transactionId?: string;

//   @ApiProperty({ enum: PaymentStatus, required: false })
//   @IsEnum(PaymentStatus)
//   @IsOptional()
//   status?: PaymentStatus;
// }
