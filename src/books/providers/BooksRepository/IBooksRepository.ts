import ICreateBookDTO from './dtos/ICreateBookDTO';
import BookModel from './models/BookModel';

export default interface IBooksRepository {
  find(): Promise<BookModel[]>;
  insert(data: ICreateBookDTO): Promise<BookModel>;
  save(data: BookModel): Promise<BookModel>;
}
