import IBook from '../models/Book';
import IBooksProvider from '../IBooksProvider';

export default class FakeBooksProvider implements IBooksProvider {
  private books: IBook[] = [];

  async find(): Promise<IBook[]> {
    return this.books;
  }

  async insert({
    title,
    description,
    author,
  }: Omit<IBook, 'id'>): Promise<IBook> {
    const insertedBook = {
      title,
      description,
      author,
      id: this.books.length + 1,
    };
    this.books.push(insertedBook);
    return insertedBook;
  }
}
