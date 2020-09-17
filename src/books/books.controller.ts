import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import ICreateBookDTO from './providers/BooksRepository/dtos/ICreateBookDTO';
import Book from './providers/BooksRepository/models/Book';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async index(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Post()
  async create(@Body() book: ICreateBookDTO): Promise<Book> {
    return this.booksService.create(book);
  }
}
