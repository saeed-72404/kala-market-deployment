import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Prisma, OrderStatus } from "@prisma/client"

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenueAgg,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        _sum: { total: true },
        where: { status: OrderStatus.COMPLETED },
      }),
      this.prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          items: { include: { product: { select: { name: true } } } },
        },
      }),
      this.prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        _count: { productId: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
    ])

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenueAgg._sum?.total ?? 0,
      recentOrders,
      topProducts,
    }
  }

  async getUsers(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } as Prisma.StringFilter<"User"> },
            { lastName: { contains: search, mode: "insensitive" } as Prisma.StringFilter<"User"> },
            { email: { contains: search, mode: "insensitive" } as Prisma.StringFilter<"User"> },
          ],
        }
      : {}

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: { select: { orders: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ])

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  async getOrders(page = 1, limit = 10, status?: OrderStatus) {
    const skip = (page - 1) * limit

    const where: Prisma.OrderWhereInput = status ? { status } : {}

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          items: { include: { product: { select: { name: true } } } },
        },
      }),
      this.prisma.order.count({ where }),
    ])

    return {
      orders,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  // اگر از کنترلر مقدار string می‌آد، یا از Pipe برای تبدیل به enum استفاده کن،
  // یا این امضا رو تغییر بده به (status: string) و قبل از update تبدیل/اعتبارسنجی کن.
  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    })
  }

  async getProducts(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit

    const where: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } as Prisma.StringFilter<"Product"> },
            {
              description: {
                contains: search,
                mode: "insensitive",
              } as Prisma.StringFilter<"Product">,
            },
          ],
        }
      : {}

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { name: true } },
          brand: { select: { name: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  async getSalesReport(startDate?: Date, endDate?: Date) {
    const where: Prisma.OrderWhereInput = {
      status: OrderStatus.COMPLETED,
      ...(startDate &&
        endDate && {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }),
    }

    const [totalSalesAgg, orderCount, avgOrderValueAgg] = await Promise.all([
      this.prisma.order.aggregate({ _sum: { total: true }, where }),
      this.prisma.order.count({ where }),
      this.prisma.order.aggregate({ _avg: { total: true }, where }),
    ])

    return {
      totalSales: totalSalesAgg._sum?.total ?? 0,
      orderCount,
      avgOrderValue: avgOrderValueAgg._avg?.total ?? 0,
    }
  }
}
