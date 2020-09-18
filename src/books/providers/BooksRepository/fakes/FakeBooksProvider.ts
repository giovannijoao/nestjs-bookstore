import BookModel from '../models/BookModel';
import IBooksRepository from '../IBooksRepository';
import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default class FakeBooksRepository implements IBooksRepository {
  private books: BookModel[] = [];

  async find(): Promise<BookModel[]> {
    return this.books;
  }

  async insert({
    title,
    description,
    author,
    price,
  }: ICreateBookDTO): Promise<BookModel> {
    const insertedBook: BookModel = {
      title,
      description,
      author,
      id: (this.books.length + 1).toString(),
      price,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };
    this.books.push(insertedBook);
    return insertedBook;
  }

  async save(book: BookModel): Promise<BookModel> {
    const index = this.books.findIndex(x => x.id === book.id);
    this.books[index] = book;
    return book;
  }
}
