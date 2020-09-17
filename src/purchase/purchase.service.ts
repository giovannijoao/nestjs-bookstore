import { HttpStatus, Injectable } from '@nestjs/common';
import AppError from '../shared/models/AppError';
import CreatePurchaseDTO from './providers/PurchasesRepository/dtos/CreatePurchaseDTO';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import IPurchase from './providers/PurchasesRepository/models/IPurchase';

@Injectable()
export class PurchaseService {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async create({ items, user_id }: CreatePurchaseDTO): Promise<IPurchase[]> {
    const hasAnItemWithZeroQuantity = items.some(item => item.quantity === 0);
    if (hasAnItemWithZeroQuantity) {
      throw new AppError(
        'You added an invalid item. Reason: quantity is equal to zero',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.purchasesRepository.create({
      items,
      user_id,
    });
  }
}
