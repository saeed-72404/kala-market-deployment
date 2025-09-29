import { Injectable, BadRequestException, ConflictException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Prisma } from "@prisma/client"

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) { }

  async validateOrderInventory(orderId: string): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      throw new BadRequestException("Order not found")
    }

    // Check each item's availability
    for (const item of order.items) {
      if (item.product.trackQuantity && item.product.quantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${item.product.name}. Available: ${item.product.quantity}, Required: ${item.quantity}`,
        )
      }
    }
  }

  async reserveOrderInventory(orderId: string, tx?: Prisma.TransactionClient): Promise<void> {
    const prisma = tx || this.prisma

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      throw new BadRequestException("Order not found")
    }

    // Use optimistic locking to prevent overselling
    for (const item of order.items) {
      if (item.product.trackQuantity) {
        try {
          const updatedProduct = await prisma.product.update({
            where: {
              id: item.productId,
              quantity: {
                gte: item.quantity, // Ensure we still have enough stock
              },
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          })

          // Log inventory change
          await this.logInventoryChange(
            item.productId,
            -item.quantity,
            "RESERVED",
            `Order ${order.orderNumber}`,
            prisma,
          )
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            // Record not found - means insufficient stock
            throw new ConflictException(`Insufficient stock for product: ${item.product.name}`)
          }
          throw error
        }
      }
    }
  }

  async restoreOrderInventory(orderId: string, tx?: Prisma.TransactionClient): Promise<void> {
    const prisma = tx || this.prisma

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      throw new BadRequestException("Order not found")
    }

    // Restore inventory for each item
    for (const item of order.items) {
      if (item.product.trackQuantity) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        })

        // Log inventory change
        await this.logInventoryChange(
          item.productId,
          item.quantity,
          "RESTORED",
          `Order ${order.orderNumber} cancelled/refunded`,
          prisma,
        )
      }
    }
  }

  async updateProductStock(
    productId: string,
    quantity: number,
    reason: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = tx || this.prisma

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new BadRequestException("Product not found")
    }

    if (product.trackQuantity) {
      const newQuantity = product.quantity + quantity

      if (newQuantity < 0) {
        throw new BadRequestException("Insufficient stock")
      }

      await prisma.product.update({
        where: { id: productId },
        data: { quantity: newQuantity },
      })

      // Log inventory change
      await this.logInventoryChange(productId, quantity, quantity > 0 ? "ADDED" : "REMOVED", reason, prisma)
    }
  }

  async checkLowStock(): Promise<any[]> {
    return this.prisma.product.findMany({
      where: {
        trackQuantity: true,
        quantity: {
          lte: this.prisma.product.fields.lowStockThreshold,
        },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        sku: true,
        quantity: true,
        lowStockThreshold: true,
      },
    })
  }

  private async logInventoryChange(
    productId: string,
    quantityChange: number,
    type: string,
    reason: string,
    prisma: Prisma.TransactionClient,
  ): Promise<void> {
    // This would typically go to a separate inventory_logs table
    // For now, we'll use the audit_logs table
    await prisma.auditLog.create({
      data: {
        action: "INVENTORY_CHANGE",
        entity: "Product",
        entityId: productId,
        newValues: {
          quantityChange,
          type,
          reason,
          timestamp: new Date(),
        },
      },
    })
  }
}
