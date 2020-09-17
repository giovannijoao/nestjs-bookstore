import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './providers/BooksRepository';
import { Book } from './providers/BooksRepository/implementations/PostgresBooksRepository/entities/Book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
