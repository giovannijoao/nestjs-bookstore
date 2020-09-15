import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import IBook from './providers/BooksProvider/models/Book';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async index(): Promise<IBook[]> {
    return this.booksService.getBooks();
  }

  @Post()
  async create(@Body() book: Omit<IBook, 'id'>): Promise<IBook> {
    return this.booksService.create(book);
  }
}
