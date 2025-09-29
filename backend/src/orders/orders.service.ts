import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto } from './dto';
import { OrderStatus, PaymentStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) { }

  async create(userId: string, dto: CreateOrderDto) {

    const cart = await this.cartService.getCart(userId);

    if (!cart.items.length) {
      throw new BadRequestException('Cart is empty');
    }

    // بررسی آدرس حمل‌ونقل
    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    // بررسی موجودی کالا
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${item.product.name}`,
        );
      }
    }

    // تولید شماره سفارش
    const orderNumber = await this.generateOrderNumber();

    const subtotal = new Prisma.Decimal(cart.total);
    const taxAmount = subtotal.mul(0.09);
    const shippingAmount =
      subtotal.greaterThan(new Prisma.Decimal(500000))
        ? new Prisma.Decimal(0)
        : new Prisma.Decimal(50000);
    const totalAmount = subtotal.plus(taxAmount).plus(shippingAmount);


    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId,
        shippingAddressId: dto.addressId, // نام درست فیلد
        subtotal,
        taxAmount,
        shippingAmount,
        discountAmount: new Prisma.Decimal(0),
        totalAmount,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: new Prisma.Decimal(
              item.product.salePrice || item.product.price,
            ),
            totalPrice: new Prisma.Decimal(
              Number(item.product.salePrice || item.product.price) *
              item.quantity,
            ),
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { take: 1, orderBy: { sortOrder: 'asc' } },
              },
            },
          },
        },
        shippingAddress: true,
      },
    });

    // به‌روزرسانی موجودی محصولات
    for (const item of cart.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }


    await this.cartService.clearCart(userId);

    return order;
  }

  async findAll(query: OrderQueryDto) {
    const {
      page = 1,
      limit = 20,
      status,
      paymentStatus,
      userId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // ✅ ساخت where با تطبیق نوع‌ها
    const where: Prisma.OrderWhereInput = {
      ...(status && { status: status as OrderStatus }),
      ...(paymentStatus && { paymentStatus: { equals: paymentStatus as PaymentStatus } }),
      ...(userId && { userId }),
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  images: { take: 1, orderBy: { sortOrder: 'asc' } },
                },
              },
            },
          },
          shippingAddress: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId?: string) {
    const where = userId ? { id, userId } : { id };

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        items: {
          include: {
            product: {
              include: {
                images: { take: 1, orderBy: { sortOrder: 'asc' } },
              },
            },
          },
        },
        shippingAddress: true,
        payments: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    await this.findOne(id);

    return this.prisma.order.update({
      where: { id },
      data: {
        status: dto.status ? { set: dto.status } : undefined,
        paymentStatus: dto.paymentStatus
          ? { set: dto.paymentStatus as PaymentStatus }
          : undefined,
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        items: { include: { product: true } },
        shippingAddress: true,
      },
    });
  }

  async getUserOrders(userId: string, query: OrderQueryDto) {
    return this.findAll({ ...query, userId });
  }

  private async generateOrderNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const prefix = `KM${year}${month}${day}`;

    const lastOrder = await this.prisma.order.findFirst({
      where: { orderNumber: { startsWith: prefix } },
      orderBy: { orderNumber: 'desc' },
    });

    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${sequence.toString().padStart(4, '0')}`;
  }
}
