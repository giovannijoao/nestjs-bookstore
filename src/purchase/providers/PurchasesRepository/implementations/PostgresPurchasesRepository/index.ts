import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePurchaseDTO from '../../dtos/CreatePurchaseDTO';
import IPurchase from '../../models/IPurchase';
import IPurchaseRepository from '../../models/IPurchaseRepository';
import { Purchase } from './entities/Purchase.entity';

export default class PostgresPurchasesRepository
  implements IPurchaseRepository {
  constructor(
    @InjectRepository(Purchase)
    private ormRepository: Repository<Purchase>,
  ) {}

  async create({ items, user_id }: CreatePurchaseDTO): Promise<IPurchase[]> {
    const purchases: Purchase[] = items.map(({ book_id, quantity }) => ({
      book_id,
      quantity,
      user_id,
      purchased_at: new Date(Date.now()),
    }));
    await this.ormRepository.save(purchases);
    return purchases;
  }
}
