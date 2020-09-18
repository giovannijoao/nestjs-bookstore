import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import ICreateBookDTO from './providers/BooksRepository/dtos/ICreateBookDTO';
import BookModel from './providers/BooksRepository/models/BookModel';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async index(): Promise<BookModel[]> {
    return this.booksService.getBooks();
  }

  @Post()
  async create(@Body() book: ICreateBookDTO): Promise<BookModel> {
    return this.booksService.create(book);
  }
}
