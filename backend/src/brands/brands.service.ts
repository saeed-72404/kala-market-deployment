import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateBrandDto, UpdateBrandDto } from "./dto"

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBrandDto) {
    // Check if slug already exists
    const existingBrand = await this.prisma.brand.findUnique({
      where: { slug: dto.slug },
    })

    if (existingBrand) {
      throw new ConflictException("Brand with this slug already exists")
    }

    return this.prisma.brand.create({
      data: dto,
      include: {
        _count: {
          select: { products: true },
        },
      },
    })
  }

  async findAll() {
    return this.prisma.brand.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    })
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          take: 10,
          include: {
            images: {
              take: 1,
              orderBy: { sortOrder: "asc" },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
    })

    if (!brand) {
      throw new NotFoundException("Brand not found")
    }

    return brand
  }

  async findBySlug(slug: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    if (!brand) {
      throw new NotFoundException("Brand not found")
    }

    return brand
  }

  async update(id: string, dto: UpdateBrandDto) {
    await this.findOne(id)

    // Check slug uniqueness if it's being updated
    if (dto.slug) {
      const existingBrand = await this.prisma.brand.findFirst({
        where: {
          slug: dto.slug,
          id: { not: id },
        },
      })

      if (existingBrand) {
        throw new ConflictException("Brand with this slug already exists")
      }
    }

    return this.prisma.brand.update({
      where: { id },
      data: dto,
      include: {
        _count: {
          select: { products: true },
        },
      },
    })
  }

  async remove(id: string) {
    const brand = await this.findOne(id)

    // Check if brand has products
    if (brand._count.products > 0) {
      throw new ConflictException("Cannot delete brand with products")
    }

    return this.prisma.brand.delete({
      where: { id },
    })
  }
}
