// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { PaymentStatus } from '@prisma/client';

// @Injectable()
// export class PaymentsService {
//     constructor(private prisma: PrismaService) { }

//     async createPayment(dto: CreatePaymentDto) {
//         // ابتدا بررسی کن که سفارش وجود دارد
//         const order = await this.prisma.order.findUnique({
//             where: { id: dto.orderId },
//         });
//         if (!order) throw new NotFoundException('Order not found');

//         // می‌توان اعتبارسنجی‌های بیشتر روی مبلغ و وضعیت انجام داد

//         return this.prisma.payment.create({
//             data: {
//                 orderId: dto.orderId,
//                 amount: dto.amount,
//                 method: dto.method,
//                 transactionId: dto.transactionId,
//                 status: PaymentStatus.PENDING,
//             },
//         });
//     }

//     async updatePaymentStatus(paymentId: string, status: PaymentStatus) {
//         const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
//         if (!payment) throw new NotFoundException('Payment not found');

//         // آپدیت وضعیت پرداخت
//         return this.prisma.payment.update({
//             where: { id: paymentId },
//             data: {
//                 status: { set: status }
//             },
//         });
//     }

//     async getPaymentById(paymentId: string) {
//         const payment = await this.prisma.payment.findUnique({
//             where: { id: paymentId },
//             include: {
//                 order: true,
//             },
//         });
//         if (!payment) throw new NotFoundException('Payment not found');
//         return payment;
//     }

//     async getPaymentsByOrder(orderId: string) {
//         return this.prisma.payment.findMany({
//             where: { orderId },
//             orderBy: { createdAt: 'desc' },
//         });
//     }

//     async getAllPayments() {
//         return this.prisma.payment.findMany({
//             orderBy: { createdAt: 'desc' },
//             include: {
//                 order: true,
//             },
//         });
//     }

//     async deletePayment(paymentId: string) {
//         const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
//         if (!payment) throw new NotFoundException('Payment not found');
//         return this.prisma.payment.delete({ where: { id: paymentId } });
//     }
// }
