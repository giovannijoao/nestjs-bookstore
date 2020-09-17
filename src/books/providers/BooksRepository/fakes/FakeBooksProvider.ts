import Book from '../models/Book';
import IBooksRepository from '../IBooksRepository';
import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  async find(): Promise<Book[]> {
    return this.books;
  }

  async insert({ title, description, author }: ICreateBookDTO): Promise<Book> {
    const insertedBook: Book = {
      title,
      description,
      author,
      id: (this.books.length + 1).toString(),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };
    this.books.push(insertedBook);
    return insertedBook;
  }

  async save(book: Book): Promise<Book> {
    const index = this.books.findIndex(x => x.id === book.id);
    this.books[index] = book;
    return book;
  }
}
