import { Controller, Post, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add product to wishlist' })
  addToWishlist(@GetUser('id') userId: string, @Param('productId') productId: string) {
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user wishlist' })
  getWishlist(@GetUser('id') userId: string) {
    return this.wishlistService.getWishlist(userId);
  }

  @Delete(':productId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove product from wishlist' })
  removeFromWishlist(@GetUser('id') userId: string, @Param('productId') productId: string) {
    return this.wishlistService.removeFromWishlist(userId, productId);
  }
}
