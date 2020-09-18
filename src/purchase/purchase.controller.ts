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
import AppError from '../shared/models/AppError';
import IPurchase from './providers/PurchasesRepository/models/IPurchase';
import { PurchaseService } from './purchase.service';
import { IEstimatesDTO, IEstimatesResponse } from './interfaces/IEstimates';

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
    return this.purchaseService.create({
      items,
      user_id: user.userId,
    });
  }

  @Post('estimates')
  async estimates(@Body() items: IEstimatesDTO): Promise<IEstimatesResponse> {
    return this.purchaseService.estimates(items);
  }
}
