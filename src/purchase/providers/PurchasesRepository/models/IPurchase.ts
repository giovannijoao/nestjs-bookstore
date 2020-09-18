export default interface IPurchase {
  readonly purchase_id: string;
  book_id: string;
  user_id: string;
  quantity: number;
  purchased_at: Date;
}
