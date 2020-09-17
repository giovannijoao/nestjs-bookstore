import CreatePurchaseDTO from '../dtos/CreatePurchaseDTO';
import IPurchase from '../models/IPurchase';
import IPurchaseRepository from '../models/IPurchaseRepository';

export default class FakePurchaseRepository implements IPurchaseRepository {
  private purchases: IPurchase[] = [];

  async create({ items, user }: CreatePurchaseDTO): Promise<IPurchase[]> {
    const purchases: IPurchase[] = items.map(({ book, quantity }) => ({
      book_id: book.id,
      quantity,
      user_id: user.userId,
      purchased_at: new Date(Date.now()),
    }));
    this.purchases.push(...purchases);
    return purchases;
  }
}
