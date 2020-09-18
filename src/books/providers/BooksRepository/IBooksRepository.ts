import ICreateBookDTO from './dtos/ICreateBookDTO';
import IFindBookDTO from './dtos/IFindBookDTO';
import BookModel from './models/BookModel';

export default interface IBooksRepository {
  find(data?: IFindBookDTO): Promise<BookModel[]>;
  insert(data: ICreateBookDTO): Promise<BookModel>;
  save(data: BookModel): Promise<BookModel>;
}
