import { Injectable } from '@nestjs/common';
import IBook from './providers/BooksProvider/models/Book';
import BooksProvider from './providers/BooksProvider/implementations/MongoBooksProvider';

@Injectable()
export class BooksService {
  constructor(private booksProvider: BooksProvider) {}

  async getBooks(): Promise<IBook[]> {
    const books = await this.booksProvider.find();
    return books;
  }

  async create({
    title,
    description,
    author,
  }: Omit<IBook, 'id'>): Promise<IBook> {
    const book = await this.booksProvider.insert({
      title,
      description,
      author,
    });
    return book;
  }
}
