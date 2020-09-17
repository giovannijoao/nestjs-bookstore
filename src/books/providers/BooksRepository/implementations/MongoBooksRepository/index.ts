import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Book from '../../models/Book';
import IBooksRepository from '../../IBooksRepository';
import { Book } from './schemas/book.schema';
import ICreateBookDTO from '../../dtos/ICreateBookDTO';

export default class MongoBooksRepository implements IBooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly BookModel: Model<Book>,
  ) {}

  async find(): Promise<Book[]> {
    const books = await this.BookModel.find();
    return books;
  }

  async insert({ title, description, author }: ICreateBookDTO): Promise<Book> {
    const insertedBook = new this.BookModel({
      title,
      description,
      author,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    });
    await insertedBook.save();
    return insertedBook;
  }

  async save(book: Book): Promise<Book> {
    await this.BookModel.updateOne(
      {
        id: book.id,
      },
      {
        $set: book,
      },
    );
    return book;
  }
}
