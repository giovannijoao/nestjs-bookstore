import CreatePurchaseDTO from '../dtos/CreatePurchaseDTO';
import IPurchase from '../models/IPurchase';
import IPurchaseRepository from '../models/IPurchaseRepository';

export default class FakePurchaseRepository implements IPurchaseRepository {
  private purchases: IPurchase[] = [];

  async create({ items, user_id }: CreatePurchaseDTO): Promise<IPurchase[]> {
    const purchases: IPurchase[] = items.map(({ book_id, quantity }, i) => ({
      purchase_id: (this.purchases.length + i + 1).toString(),
      book_id,
      quantity,
      user_id,
      purchased_at: new Date(Date.now()),
    }));
    this.purchases.push(...purchases);
    return purchases;
  }
}
