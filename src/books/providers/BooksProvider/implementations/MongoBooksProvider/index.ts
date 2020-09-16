import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IBook from '../../models/Book';
import IBooksProvider from '../../IBooksProvider';
import { Book } from './schemas/book.schema';
import ICreateBookDTO from '../../dtos/ICreateBookDTO';

export default class MongoBooksProvider implements IBooksProvider {
  constructor(
    @InjectModel(Book.name) private readonly BookModel: Model<Book>,
  ) {}

  async find(): Promise<IBook[]> {
    const books = await this.BookModel.find();
    return books;
  }

  async insert({ title, description, author }: ICreateBookDTO): Promise<IBook> {
    const insertedBook = new this.BookModel({
      title,
      description,
      author,
    });
    await insertedBook.save();
    return insertedBook;
  }
}
