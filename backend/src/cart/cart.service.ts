import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: string, dto: AddToCartDto) {
    // Check if product exists and is available
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found or not available');
    }

    if (product.stock < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: dto.productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + dto.quantity;
      
      if (product.stock < newQuantity) {
        throw new BadRequestException('Insufficient stock');
      }

      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: {
          product: {
            include: {
              images: {
                take: 1,
                orderBy: { sortOrder: 'asc' },
              },
            },
          },
        },
      });
    }

    // Create new cart item
    return this.prisma.cartItem.create({
      data: {
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
      include: {
        product: {
          include: {
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });
  }

  async getCart(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = cartItems.reduce((sum, item) => {
      const price = item.product.price;  //item.product.salePrice || 
      return sum + (Number(price) * item.quantity);
    }, 0);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: cartItems,
      total,
      totalItems,
    };
  }

  async updateCartItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId,
      },
      include: { product: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.product.stock < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
      include: {
        product: {
          include: {
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });
  }

  async removeFromCart(userId: string, itemId: string) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(userId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { userId },
    });
  }

  async getCartCount(userId: string) {
    const result = await this.prisma.cartItem.aggregate({
      where: { userId },
      _sum: { quantity: true },
    });

    return result._sum.quantity || 0;
  }
}
