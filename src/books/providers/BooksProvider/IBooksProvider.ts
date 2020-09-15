import IBook from './models/Book';

export default interface IBooksProvider {
  find(): Promise<IBook[]>;
  insert(data: Omit<IBook, 'id'>): Promise<IBook>;
}
