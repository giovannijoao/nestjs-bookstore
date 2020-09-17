import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { Book } from './books/providers/BooksRepository/implementations/PostgresBooksRepository/entities/Book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
    UsersModule,
    SessionsModule,
    BooksModule,
  ],
})
export class AppModule {}
