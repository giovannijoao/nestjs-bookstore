import CreatePurchaseDTO from '../dtos/CreatePurchaseDTO';
import IPurchase from '../models/IPurchase';
import IPurchaseItem from '../models/IPurchaseItem';
import IPurchaseRepository from '../models/IPurchaseRepository';

export default class FakePurchaseRepository implements IPurchaseRepository {
  private purchases: IPurchase[] = [];

  private purchasesItems: IPurchaseItem[] = [];

  async create(request: CreatePurchaseDTO): Promise<IPurchase> {
    const purchase_id = (this.purchases.length + 1).toString();
    const purchaseItems: IPurchaseItem[] = request.items.map(
      ({ book_id, total_price, unity_price, quantity }, i) => ({
        item_id: (this.purchasesItems.length + i + 1).toString(),
        purchase_id,
        book_id,
        quantity,
        total_price,
        unity_price,
      }),
    );
    const purchase: IPurchase = {
      purchase_id,
      purchased_at: new Date(Date.now()),
      quantity: request.items_quantity,
      total_price: request.total_price,
      user_id: request.user_id,
      items: purchaseItems,
    };
    this.purchases.push(purchase);
    this.purchasesItems.push(...purchaseItems);
    return purchase;
  }
}
