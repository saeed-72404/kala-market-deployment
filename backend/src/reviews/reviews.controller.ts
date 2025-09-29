import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('Reviews')
@Controller('reviews')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  createReview(
    @GetUser('id') userId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(userId, dto);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all reviews for a product' })
  getReviewsByProduct(@Param('productId') productId: string) {
    return this.reviewsService.getReviewsByProduct(productId);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get reviews of the logged-in user' })
  getUserReviews(@GetUser('id') userId: string) {
    return this.reviewsService.getUserReviews(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  updateReview(
    @GetUser('id') userId: string,
    @Param('id') reviewId: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(userId, reviewId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  deleteReview(
    @GetUser('id') userId: string,
    @Param('id') reviewId: string,
  ) {
    return this.reviewsService.deleteReview(userId, reviewId);
  }
}
