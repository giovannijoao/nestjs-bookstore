export default class CreatePurchaseRequestDTO {
  items: Array<{
    book_id: string;
    quantity: number;
  }>;

  user_id: string;
}
