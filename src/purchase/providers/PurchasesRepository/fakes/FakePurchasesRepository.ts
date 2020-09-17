import CreatePurchaseDTO from '../dtos/CreatePurchaseDTO';
import IPurchase from '../models/IPurchase';
import IPurchaseRepository from '../models/IPurchaseRepository';

export default class FakePurchaseRepository implements IPurchaseRepository {
  private purchases: IPurchase[] = [];

  async create({ items, user_id }: CreatePurchaseDTO): Promise<IPurchase[]> {
    const purchases: IPurchase[] = items.map(({ book_id, quantity }) => ({
      book_id,
      quantity,
      user_id,
      purchased_at: new Date(Date.now()),
    }));
    this.purchases.push(...purchases);
    return purchases;
  }
}
