export default class CreatePurchaseDTO {
  items: Array<{
    book_id: string;
    quantity: number;
    unity_price: number;
    total_price: number;
  }>;

  items_quantity: number;

  total_price: number;

  user_id: string;
}
