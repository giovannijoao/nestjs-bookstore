import ICreateBookDTO from './dtos/ICreateBookDTO';
import Book from './models/Book';

export default interface IBooksRepository {
  find(): Promise<Book[]>;
  insert(data: ICreateBookDTO): Promise<Book>;
  save(data: Book): Promise<Book>;
}
