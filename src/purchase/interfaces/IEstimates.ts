export type IEstimatesDTO = Array<{
  book_id: string;
  quantity: number;
}>;

export interface IEstimatesResponse {
  total_price: number;
  items_quantity: number;
  items: Array<{
    book_id: string;
    quantity: number;
    unity_price: number;
    total_price: number;
    title: string;
    author: string;
  }>;
}
