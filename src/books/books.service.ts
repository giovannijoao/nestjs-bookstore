import { Injectable } from '@nestjs/common';
import Book from './providers/BooksRepository/models/Book';
import { BooksRepository } from './providers/BooksRepository';
import ICreateBookDTO from './providers/BooksRepository/dtos/ICreateBookDTO';

@Injectable()
export class BooksService {
  constructor(private booksProvider: BooksRepository) {}

  async getBooks(): Promise<Book[]> {
    const books = await this.booksProvider.find();
    return books;
  }

  async create({ title, description, author }: ICreateBookDTO): Promise<Book> {
    const book = await this.booksProvider.insert({
      title,
      description,
      author,
    });
    return book;
  }
}
