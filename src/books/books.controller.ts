import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import ICreateBookDTO from './providers/BooksProvider/dtos/ICreateBookDTO';
import IBook from './providers/BooksProvider/models/Book';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async index(): Promise<IBook[]> {
    return this.booksService.getBooks();
  }

  @Post()
  async create(@Body() book: ICreateBookDTO): Promise<IBook> {
    return this.booksService.create(book);
  }
}
