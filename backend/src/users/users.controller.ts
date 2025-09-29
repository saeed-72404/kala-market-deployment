import { Controller, Get, Post, Patch, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"

import { UsersService } from "./users.service"
import type { CreateUserDto, UpdateUserDto, CreateAddressDto, UpdateAddressDto } from "./dto"
import { JwtGuard } from "../auth/guard"
import { UserRole,Roles } from "../auth/decorator"
import { RolesGuard } from "../auth/guard/roles.guard"

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Create a new user (Admin only)" })
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Get all users (Admin only)" })
  findAll() {
    return this.usersService.findAll()
  }

  @Get("profile")
  @ApiOperation({ summary: "Get current user profile" })
  getProfile(userId: string) {
    return this.usersService.findOne(userId)
  }

  @Get(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Get user by ID (Admin only)" })
  findOne(id: string) {
    return this.usersService.findOne(id)
  }

  @Patch("profile")
  @ApiOperation({ summary: "Update current user profile" })
  updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto)
  }

  @Patch(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Update user (Admin only)" })
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Delete user (Admin only)" })
  remove(id: string) {
    return this.usersService.remove(id)
  }

  // Address endpoints
  @Post("addresses")
  @ApiOperation({ summary: "Create user address" })
  createAddress(userId: string, dto: CreateAddressDto) {
    return this.usersService.createAddress(userId, dto)
  }

  @Get("addresses")
  @ApiOperation({ summary: "Get user addresses" })
  getUserAddresses(userId: string) {
    return this.usersService.getUserAddresses(userId)
  }

  @Patch("addresses/:id")
  @ApiOperation({ summary: "Update user address" })
  updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {
    return this.usersService.updateAddress(userId, addressId, dto)
  }

  @Delete("addresses/:id")
  @ApiOperation({ summary: "Delete user address" })
  deleteAddress(userId: string, addressId: string) {
    return this.usersService.deleteAddress(userId, addressId)
  }

  @Patch("addresses/:id/default")
  @ApiOperation({ summary: "Set default address" })
  setDefaultAddress(userId: string, addressId: string) {
    return this.usersService.setDefaultAddress(userId, addressId)
  }
}
