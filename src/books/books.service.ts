import { Injectable } from '@nestjs/common';
import IBook from './providers/BooksRepository/models/Book';
import { BooksRepository } from './providers/BooksRepository';
import ICreateBookDTO from './providers/BooksRepository/dtos/ICreateBookDTO';

@Injectable()
export class BooksService {
  constructor(private booksProvider: BooksRepository) {}

  async getBooks(): Promise<IBook[]> {
    const books = await this.booksProvider.find();
    return books;
  }

  async create({ title, description, author }: ICreateBookDTO): Promise<IBook> {
    const book = await this.booksProvider.insert({
      title,
      description,
      author,
    });
    return book;
  }
}
