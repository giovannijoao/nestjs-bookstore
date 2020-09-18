import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import { Purchase } from './providers/PurchasesRepository/implementations/PostgresPurchasesRepository/entities/Purchase.entity';
import { BooksRepository } from '../books/providers/BooksRepository';
import { Book } from '../books/providers/BooksRepository/implementations/PostgresBooksRepository/entities/Book.entity';
import { PurchaseItem } from './providers/PurchasesRepository/implementations/PostgresPurchasesRepository/entities/PurchaseItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseItem, Book])],
  providers: [BooksRepository, PurchasesRepository, PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
