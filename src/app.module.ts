import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), BooksModule],
})
export class AppModule {}
