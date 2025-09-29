import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import { hash } from "bcryptjs"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateUserDto, UpdateUserDto, CreateAddressDto, UpdateAddressDto } from "./dto"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    })

    if (existingUser) {
      throw new ConflictException("User already exists")
    }

    // Hash password
    const hashedPassword = await hash(dto.password!, 12)

    // return this.prisma.user.create({
    //   data: {
    //     email: dto.email!,
    //     phone: dto.phone!,
    //     firstName: dto.firstName ?? "",
    //     lastName: dto.lastName ?? "",
    //     role: dto.role ?? "USER",
    //     password: hashedPassword,
    //     isActive: true,
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     phone: true,
    //     firstName: true,
    //     lastName: true,
    //     role: true,
    //     isActive: true,
    //     createdAt: true,
    //   },
    // })
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        addresses: true,
      },
    })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async update(id: string, dto: UpdateUserDto) {
  // بررسی وجود کاربر
  await this.findOne(id);

  // هش کردن پسورد در صورت وجود
  let hashedPassword: string | undefined;
  if (dto.password) {
    hashedPassword = await hash(dto.password, 12);
  }

  // فقط فیلدهای واقعی User را برای Prisma آماده می‌کنیم
  const { email, phone, firstName, lastName, role, isActive } = dto;
  const data: any = {
    ...(email !== undefined && { email }),
    ...(phone !== undefined && { phone }),
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
    ...(role !== undefined && { role }), // باید یکی از UserRole ها باشد: SUPER_ADMIN, ADMIN, SELLER, CUSTOMER
    ...(isActive !== undefined && { isActive }),
    ...(hashedPassword && { password: hashedPassword }),
  };

  return this.prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    },
  });
}


  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.user.delete({ where: { id } })
  }

  // Address management
  async createAddress(userId: string, dto: CreateAddressDto) {
    if (!dto.title) {
      throw new ConflictException("Address title is required")
    }
    // Only include fields that are defined and required by the Prisma schema
    const addressData: any = {
      userId,
      title: dto.title,
    }
    if (dto.firstName !== undefined) addressData.firstName = dto.firstName
    if (dto.lastName !== undefined) addressData.lastName = dto.lastName
    if (dto.phone !== undefined) addressData.phone = dto.phone
    if (dto.address !== undefined) addressData.address = dto.address
    if (dto.city !== undefined) addressData.city = dto.city
    if (dto.state !== undefined) addressData.state = dto.state
    if (dto.postalCode !== undefined) addressData.postalCode = dto.postalCode
    if (dto.country !== undefined) addressData.country = dto.country
    if (dto.isDefault !== undefined) addressData.isDefault = dto.isDefault

    return this.prisma.address.create({
      data: addressData,
    })
  }

  async getUserAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: "desc" },
    })
  }

  async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, userId },
    })

    if (!address) {
      throw new NotFoundException("Address not found")
    }

    return this.prisma.address.update({
      where: { id: addressId },
      data: dto,
    })
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, userId },
    })

    if (!address) {
      throw new NotFoundException("Address not found")
    }

    return this.prisma.address.delete({
      where: { id: addressId },
    })
  }

  async setDefaultAddress(userId: string, addressId: string) {
    // First, remove default from all addresses
    await this.prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    })

    // Then set the new default
    return this.prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true },
    })
  }
}
