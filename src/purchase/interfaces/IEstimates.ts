export type IEstimatesDTO = Array<{
  book_id: string;
  quantity: number;
}>;

export interface IEstimatesResponse {
  totalPrice: number;
  itemsQuantity: number;
  items: Array<{
    book_id: string;
    quantity: number;
    unityPrice: number;
    totalPrice: number;
    title: string;
    author: string;
  }>;
}
