// import {
//     Controller,
//     Get,
//     Post,
//     Patch,
//     Delete,
//     Body,
//     Param,
//     UseGuards,
//     ParseUUIDPipe,
// } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

// import { PaymentsService } from './payments.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { PaymentStatus } from '@prisma/client';
// import { JwtGuard } from '../auth/guard';
// import { RolesGuard } from '../auth/guard/roles.guard';
// import { Roles, UserRole } from '../auth/decorator';

// @ApiTags('Payments')
// @Controller('payments')
// export class PaymentsController {
//     constructor(private readonly paymentsService: PaymentsService) { }

//     @Post()
//     @UseGuards(JwtGuard, RolesGuard)
//     @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Create a new payment record (Admin only)' })
//     create(@Body() dto: CreatePaymentDto) {
//         return this.paymentsService.createPayment(dto);
//     }

//     @Patch(':id/status')
//     @UseGuards(JwtGuard, RolesGuard)
//     @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Update payment status (Admin only)' })
//     updateStatus(
//         @Param('id', ParseUUIDPipe) id: string,
//         @Body('status') status: PaymentStatus,
//     ) {
//         return this.paymentsService.updatePaymentStatus(id, status);
//     }

//     @Get(':id')
//     @UseGuards(JwtGuard, RolesGuard)
//     @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Get payment by ID (Admin only)' })
//     getPayment(@Param('id', ParseUUIDPipe) id: string) {
//         return this.paymentsService.getPaymentById(id);
//     }

//     @Get('order/:orderId')
//     @UseGuards(JwtGuard, RolesGuard)
//     @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Get payments by order ID (Admin only)' })
//     getPaymentsByOrder(@Param('orderId') orderId: string) {
//         return this.paymentsService.getPaymentsByOrder(orderId);
//     }

//     @Get()
//     @UseGuards(JwtGuard, RolesGuard)
//     @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Get all payments (Admin only)' })
//     findAll() {
//         return this.paymentsService.getAllPayments();
//     }

//     @Delete(':id')
//     @UseGuards(JwtGuard, RolesGuard)
//     @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Delete payment (Admin only)' })
//     remove(@Param('id', ParseUUIDPipe) id: string) {
//         return this.paymentsService.deletePayment(id);
//     }
// }
