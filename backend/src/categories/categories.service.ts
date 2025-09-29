import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    // Check if slug already exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this slug already exists');
    }

    // If parentId is provided, check if parent exists
    if (dto.parentId) {
      const parent = await this.prisma.category.findUnique({
        where: { id: dto.parentId },
      });

      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
    }

    return this.prisma.category.create({
      data: dto,
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
          include: {
            children: {
              where: { isActive: true },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
          include: {
            _count: {
              select: { products: true },
            },
          },
        },
        products: {
          where: { isActive: true },
          take: 10,
          include: {
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);

    // Check slug uniqueness if it's being updated
    if (dto.slug) {
      const existingCategory = await this.prisma.category.findFirst({
        where: {
          slug: dto.slug,
          id: { not: id },
        },
      });

      if (existingCategory) {
        throw new ConflictException('Category with this slug already exists');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    // Check if category has products
    if (category._count.products > 0) {
      throw new ConflictException('Cannot delete category with products');
    }

    // Check if category has children
    if (category.children.length > 0) {
      throw new ConflictException('Cannot delete category with subcategories');
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }

  async getHierarchy() {
    return this.prisma.category.findMany({
      where: {
        parentId: null,
        isActive: true,
      },
      include: {
        children: {
          where: { isActive: true },
          include: {
            children: {
              where: { isActive: true },
              include: {
                _count: {
                  select: { products: true },
                },
              },
            },
            _count: {
              select: { products: true },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
