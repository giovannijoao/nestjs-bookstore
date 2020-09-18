import { HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import AppError from '../../../../../shared/models/AppError';
import CreatePurchaseDTO from '../../dtos/CreatePurchaseDTO';
import IPurchase from '../../models/IPurchase';
import IPurchaseRepository from '../../models/IPurchaseRepository';
import { Purchase } from './entities/Purchase.entity';
import { PurchaseItem } from './entities/PurchaseItem.entity';

@Injectable()
export default class PostgresPurchasesRepository
  implements IPurchaseRepository {
  constructor(private connection: Connection) {}

  async create(request: CreatePurchaseDTO): Promise<IPurchase> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const purchase = queryRunner.manager.getRepository(Purchase).create({
        quantity: request.items_quantity,
        user_id: request.user_id,
        total_price: request.total_price,
      });
      await queryRunner.manager.save(purchase);
      const purchaseItems = request.items.map(
        ({ book_id, total_price, unity_price, quantity }) =>
          queryRunner.manager.getRepository(PurchaseItem).create({
            book_id,
            quantity,
            total_price,
            unity_price,
            purchase_id: purchase.purchase_id,
          }),
      );
      purchase.items = purchaseItems;
      await queryRunner.manager.save(purchase);
      await queryRunner.commitTransaction();
      return purchase;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppError(
        'Ocorreu um erro ao tentar adicionar transação.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
