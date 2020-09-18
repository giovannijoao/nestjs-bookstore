import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { PurchaseModule } from './purchase/purchase.module';
import { TasksControllerModule } from './tasks-controller/tasks-controller.module';

process.env.IGNORE_MIGRATIONS = 'true';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    SessionsModule,
    BooksModule,
    PurchaseModule,
    TasksControllerModule,
  ],
})
export class AppModule {}
