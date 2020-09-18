import BookModel from '../models/BookModel';
import IBooksRepository from '../IBooksRepository';
import ICreateBookDTO from '../dtos/ICreateBookDTO';
import IFindBookDTO from '../dtos/IFindBookDTO';

export default class FakeBooksRepository implements IBooksRepository {
  private books: BookModel[] = [];

  async find(filter?: IFindBookDTO): Promise<BookModel[]> {
    let books = [...this.books];
    if (filter?.ids) books = books.filter(book => filter.ids.includes(book.id));
    return books;
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
