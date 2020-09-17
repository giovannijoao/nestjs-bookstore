export default interface IBook {
  id: number;
  title: string;
  description: string;
  author: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
