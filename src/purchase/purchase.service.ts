import { HttpStatus, Injectable } from '@nestjs/common';
import { BooksRepository } from '../books/providers/BooksRepository';
import AppError from '../shared/models/AppError';
import CreatePurchaseRequestDTO from './dtos/CreatePurchaseRequestDTO';
import { IEstimatesDTO, IEstimatesResponse } from './interfaces/IEstimates';
import CreatePurchaseDTO from './providers/PurchasesRepository/dtos/CreatePurchaseDTO';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import IPurchase from './providers/PurchasesRepository/models/IPurchase';

@Injectable()
export class PurchaseService {
  constructor(
    private purchasesRepository: PurchasesRepository,
    private booksRepository: BooksRepository,
  ) {}

  /** Creates an purchase */
  async create({
    items,
    user_id,
  }: CreatePurchaseRequestDTO): Promise<IPurchase> {
    const hasAnItemWithZeroQuantity = items.some(item => item.quantity === 0);
    if (hasAnItemWithZeroQuantity) {
      throw new AppError(
        'You added an invalid item. Reason: quantity is equal to zero',
        HttpStatus.BAD_REQUEST,
      );
    }
    const requestedBooks = await this.booksRepository.find({
      ids: items.map(item => item.book_id),
    });
    const estimates: CreatePurchaseDTO = requestedBooks.reduce(
      (a, book) => {
        const accumulator = a;
        const requestedItem = items.find(item => item.book_id === book.id);
        const itemtotal_price = book.price * requestedItem.quantity;
        accumulator.total_price += itemtotal_price;
        accumulator.items_quantity += 1;
        accumulator.items.push({
          book_id: book.id,
          quantity: requestedItem.quantity,
          total_price: itemtotal_price,
          unity_price: book.price,
        });
        return a;
      },
      {
        total_price: 0,
        items_quantity: 0,
        items: [],
        user_id,
      },
    );
    return this.purchasesRepository.create(estimates);
  }

  /** Get total price and price by book */
  async estimates(items: IEstimatesDTO): Promise<IEstimatesResponse> {
    const requestedBooks = await this.booksRepository.find({
      ids: items.map(item => item.book_id),
    });
    return requestedBooks.reduce<IEstimatesResponse>(
      (a, book) => {
        const accumulator = a;
        const requestedItem = items.find(item => item.book_id === book.id);
        const itemtotal_price = book.price * requestedItem.quantity;
        accumulator.total_price += itemtotal_price;
        accumulator.items_quantity += 1;
        accumulator.items.push({
          book_id: book.id,
          quantity: requestedItem.quantity,
          total_price: itemtotal_price,
          unity_price: book.price,
          title: book.title,
          author: book.author,
        });
        return a;
      },
      {
        total_price: 0,
        items_quantity: 0,
        items: [],
      },
    );
  }
}
