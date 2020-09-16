import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksProvider } from './providers/BooksProvider';
import {
  Book,
  BookSchema,
} from './providers/BooksProvider/implementations/MongoBooksProvider/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksProvider],
})
export class BooksModule {}
