import ICreateBookDTO from './dtos/ICreateBookDTO';
import IBook from './models/Book';

export default interface IBooksRepository {
  find(): Promise<IBook[]>;
  insert(data: ICreateBookDTO): Promise<IBook>;
  save(data: IBook): Promise<IBook>;
}
