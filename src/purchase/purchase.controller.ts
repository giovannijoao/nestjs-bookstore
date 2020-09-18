import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decoratos/user.decorator';
import UserModel from '../users/providers/UsersRepository/models/User';
import BookModel from '../books/providers/BooksRepository/models/BookModel';
import AppError from '../shared/models/AppError';
import IPurchase from './providers/PurchasesRepository/models/IPurchase';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    items: Array<{
      book_id: string;
      quantity: number;
    }>,
    @User() user: UserModel,
  ): Promise<IPurchase[]> {
    try {
      const result = await this.purchaseService.create({
        items,
        user_id: user.userId,
      });
      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException(error.message, error.statusCode);
      } else {
        throw new HttpException(
          'Ocorreu um erro interno',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
