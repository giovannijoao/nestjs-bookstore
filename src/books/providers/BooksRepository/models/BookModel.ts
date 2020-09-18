export default class BookModel {
  id: string;

  title: string;

  description: string;

  author: string;

  price: number;

  readonly created_at: Date;

  readonly updated_at: Date;
}
