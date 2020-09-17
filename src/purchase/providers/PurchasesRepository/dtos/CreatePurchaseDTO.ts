export default class CreatePurchaseDTO {
  items: Array<{
    book_id: string;
    quantity: number;
  }>;

  user_id: string;
}
