import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async addToWishlist(userId: string, productId: string) {
    return this.prisma.wishlistItem.create({
      data: { userId, productId },
    });
  }

  async getWishlist(userId: string) {
    return this.prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async removeFromWishlist(userId: string, productId: string) {
    const wishlistItem = await this.prisma.wishlistItem.findFirst({
      where: { userId, productId },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Product not found in wishlistItem');
    }

    return this.prisma.wishlistItem.delete({
      where: { id: wishlistItem.id },
    });
  }
}
