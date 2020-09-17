import IBook from '../models/Book';
import IBooksRepository from '../IBooksRepository';
import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default class FakeBooksRepository implements IBooksRepository {
  private books: IBook[] = [];

  async find(): Promise<IBook[]> {
    return this.books;
  }

  async insert({ title, description, author }: ICreateBookDTO): Promise<IBook> {
    const insertedBook: IBook = {
      title,
      description,
      author,
      id: this.books.length + 1,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };
    this.books.push(insertedBook);
    return insertedBook;
  }

  async save(book: IBook): Promise<IBook> {
    const index = this.books.findIndex(x => x.id === book.id);
    this.books[index] = book;
    return book;
  }
}
