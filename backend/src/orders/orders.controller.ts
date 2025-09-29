import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser, Roles, UserRole } from '../auth/decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  create(@GetUser('id') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  findAll(@Query() query: OrderQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get('my-orders')
  @ApiOperation({ summary: 'Get user orders' })
  getUserOrders(@GetUser('id') userId: string, @Query() query: OrderQueryDto) {
    return this.ordersService.getUserOrders(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(@Param('id') id: string, @GetUser() user: any) {
    const userId = user.role === 'USER' ? user.id : undefined;
    return this.ordersService.findOne(id, userId);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }
}
