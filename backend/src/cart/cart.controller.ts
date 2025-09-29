import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  addToCart(@GetUser('id') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  getCart(@GetUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get cart items count' })
  getCartCount(@GetUser('id') userId: string) {
    return this.cartService.getCartCount(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  updateCartItem(
    @GetUser('id') userId: string,
    @Param('id') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(userId, itemId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeFromCart(@GetUser('id') userId: string, @Param('id') itemId: string) {
    return this.cartService.removeFromCart(userId, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  clearCart(@GetUser('id') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
