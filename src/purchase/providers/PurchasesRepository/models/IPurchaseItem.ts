export default interface IPurchaseItem {
  readonly item_id: string;
  book_id: string;
  quantity: number;
  unity_price: number;
  total_price: number;
}
