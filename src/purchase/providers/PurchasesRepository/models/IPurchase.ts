import IPurchaseItem from './IPurchaseItem';

export default interface IPurchase {
  readonly purchase_id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  items: IPurchaseItem[];
  readonly purchased_at: Date;
}
