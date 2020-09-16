import IBook from '../models/Book';
import IBooksProvider from '../IBooksProvider';
import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default class FakeBooksProvider implements IBooksProvider {
  private books: IBook[] = [];

  async find(): Promise<IBook[]> {
    return this.books;
  }

  async insert({ title, description, author }: ICreateBookDTO): Promise<IBook> {
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
