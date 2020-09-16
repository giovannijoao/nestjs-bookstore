import ICreateBookDTO from './dtos/CreateBookDTO';
import IBook from './models/Book';

export default interface IBooksProvider {
  find(): Promise<IBook[]>;
  insert(data: ICreateBookDTO): Promise<IBook>;
}
