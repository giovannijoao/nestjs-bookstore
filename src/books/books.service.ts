import { Injectable } from '@nestjs/common';
import BookModel from './providers/BooksRepository/models/BookModel';
import { BooksRepository } from './providers/BooksRepository';
import ICreateBookDTO from './providers/BooksRepository/dtos/ICreateBookDTO';

@Injectable()
export class BooksService {
  constructor(private booksProvider: BooksRepository) {}

  async getBooks(): Promise<BookModel[]> {
    const books = await this.booksProvider.find();
    return books;
  }

  async create({
    title,
    description,
    author,
    price,
  }: ICreateBookDTO): Promise<BookModel> {
    const book = await this.booksProvider.insert({
      title,
      description,
      author,
      price,
    });
    return book;
  }
}
