import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"
import { AdminService } from "./admin.service"
import { JwtGuard } from "../auth/guard"
import { UserRole,Roles } from "../auth/decorator"
import { RolesGuard } from "../auth/guard/roles.guard"
import { OrderStatus } from "@prisma/client"

@ApiTags("Admin")
@Controller("admin")
@UseGuards(JwtGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("dashboard")
  @ApiOperation({ summary: "Get dashboard statistics" })
  getDashboardStats() {
    return this.adminService.getDashboardStats()
  }

  @Get("users")
  @ApiOperation({ summary: "Get users list" })
  getUsers(page?: string, limit?: string, search?: string) {
    return this.adminService.getUsers(page ? Number.parseInt(page) : 1, limit ? Number.parseInt(limit) : 10, search)
  }

  @Get("orders")
  @ApiOperation({ summary: "Get orders list" })
  getOrders(page?: string, limit?: string, status?: string) {
    return this.adminService.getOrders(page ? Number.parseInt(page) : 1, limit ? Number.parseInt(limit) : 10, status ? (status as OrderStatus) : undefined)
  }

  @Patch("orders/:id/status")
  @ApiOperation({ summary: "Update order status" })
  updateOrderStatus(@Param('id') id: string, status: string) {
    return this.adminService.updateOrderStatus(id, status as OrderStatus)
  }

  @Get("products")
  @ApiOperation({ summary: "Get products list" })
  getProducts(page?: string, limit?: string, search?: string) {
    return this.adminService.getProducts(page ? Number.parseInt(page) : 1, limit ? Number.parseInt(limit) : 10, search)
  }

  @Get("reports/sales")
  @ApiOperation({ summary: "Get sales report" })
  getSalesReport(startDate?: string, endDate?: string) {
    return this.adminService.getSalesReport(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }
}
