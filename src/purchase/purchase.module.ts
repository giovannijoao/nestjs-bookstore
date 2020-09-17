import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import { Purchase } from './providers/PurchasesRepository/implementations/PostgresPurchasesRepository/entities/Purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [PurchasesRepository, PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
