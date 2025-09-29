import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"

import { BrandsService } from "./brands.service"
import type { CreateBrandDto, UpdateBrandDto } from "./dto"
import { JwtGuard } from "../auth/guard"
import { Roles, UserRole } from "../auth/decorator"
import { RolesGuard } from "../auth/guard/roles.guard"

@ApiTags("Brands")
@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new brand" })
  create(createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @Get()
  @ApiOperation({ summary: "Get all brands" })
  findAll() {
    return this.brandsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by ID' })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get brand by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.brandsService.findBySlug(slug);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update brand" })
  update(@Param('id') id: string, updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto)
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete brand' })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
