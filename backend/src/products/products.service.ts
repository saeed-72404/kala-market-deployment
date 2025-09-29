import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProductDto) {
    const { images, attributes, variants, ...productData } = dto;

    // return this.prisma.product.create({
    //   data: {
    //     ...productData,
    //     images: images ? {
    //       create: images.filter(img => img.url && img.alt).map((img, index) => ({
    //         url: img.url!,
    //         alt: img.alt!,
    //         sortOrder: index,
    //       })),
    //     } : undefined,
    //     attributes: attributes
    //       ? { create: attributes.filter(a => a.name && a.value).map(a => ({ name: a.name!, value: a.value! })) }
    //       : undefined,
    //     variants: variants
    //       ? { create: variants.filter(v => v.name && v.value).map(v => ({ name: v.name!, value: v.value!, price: v.price })) }
    //       : undefined
    //   },
    //   include: {
    //     category: true,
    //     brand: true,
    //     images: true,
    //     attributes: true,
    //     variants: true,
    //   },
    // });
  }

  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 20,
      search,
      categoryId,
      brandId,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isFeatured,
      isActive = true,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isActive,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(brandId && { brandId }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
      ...(isFeatured !== undefined && { isFeatured }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
          _count: {
            select: { reviews: true },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        // attributes: true,
        variants: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Calculate average rating
    const avgRating = await this.prisma.review.aggregate({
      where: {
        productId: id,
        isApproved: true,
      },
      _avg: {
        rating: true,
      },
    });

    return {
      ...product,
      avgRating: avgRating._avg.rating || 0,
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        // attributes: true,
        variants: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const { images, attributes, variants, ...productData } = dto;

    // Check if product exists
    await this.findOne(id);

    // return this.prisma.product.update({
    //   where: { id },
    //   data: {
    //     ...productData,
    //     ...(images && {
    //       images: {
    //         deleteMany: {},
    //         create: images.map((img, index) => ({
    //           url: img.url,
    //           alt: img.alt,
    //           sortOrder: index,
    //         })),
    //       },
    //     }),
    //     ...(attributes && {
    //       attributes: {
    //         deleteMany: {},
    //         create: attributes,
    //       },
    //     }),
    //     ...(variants && {
    //       variants: {
    //         deleteMany: {},
    //         create: variants,
    //       },
    //     }),
    //   },
    //   include: {
    //     category: true,
    //     brand: true,
    //     images: true,
    //     attributes: true,
    //     variants: true,
    //   },
    // });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }

  async getFeatured(limit = 10) {
    return this.prisma.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
        // status: 'PUBLISHED',
      },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRelated(productId: string, categoryId: string, limit = 4) {
    return this.prisma.product.findMany({
      where: {
        categoryId,
        id: { not: productId },
        isActive: true,
        // status: 'PUBLISHED',
      },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
