import { Test, TestingModule } from '@nestjs/testing';
import { BooksRepository } from '../books/providers/BooksRepository';
import FakeBooksRepository from '../books/providers/BooksRepository/fakes/FakeBooksProvider';
import AppError from '../shared/models/AppError';
import FakePurchaseRepository from './providers/PurchasesRepository/fakes/FakePurchasesRepository';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let fakePurchasesRepository: FakePurchaseRepository;
  let fakeBooksRepository: FakeBooksRepository;

  beforeEach(async () => {
    fakePurchasesRepository = new FakePurchaseRepository();
    fakeBooksRepository = new FakeBooksRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PurchasesRepository,
          useValue: fakePurchasesRepository,
        },
        {
          provide: BooksRepository,
          useValue: fakeBooksRepository,
        },
        PurchaseService,
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
  });

  it('should be able to handle a purchase', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 0);
    const books = await Promise.all([
      fakeBooksRepository.insert({
        title: 'A Book',
        author: 'john doe',
        description: 'my book',
        price: 1,
      }),
      fakeBooksRepository.insert({
        title: 'A Second Book',
        author: 'john doe',
        description: 'my second book',
        price: 2,
      }),
    ]);
    const purchase = await service.create({
      items: [
        {
          book_id: books[0].id,
          quantity: 1,
        },
        {
          book_id: books[1].id,
          quantity: 2,
        },
      ],
      user_id: 'randomUser',
    });
    expect(purchase.total_price).toBe(5);
    expect(purchase.quantity).toBe(2);
    expect(purchase.items).toEqual(
      expect.arrayContaining([
        {
          item_id: '1',
          purchase_id: '1',
          book_id: books[0].id,
          quantity: 1,
          unity_price: 1,
          total_price: 1,
        },
        {
          item_id: '2',
          purchase_id: '1',
          book_id: books[1].id,
          quantity: 2,
          unity_price: 2,
          total_price: 4,
        },
      ]),
    );
  });

  it('should not be able to handle a purchase if any quantity is zero', async () => {
    await expect(
      service.create({
        items: [
          {
            book_id: '1',
            quantity: 0,
          },
        ],
        user_id: 'randomUser',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return estimates correctly', async () => {
    const books = await Promise.all([
      fakeBooksRepository.insert({
        title: 'A Book',
        author: 'john doe',
        description: 'my book',
        price: 1,
      }),
      fakeBooksRepository.insert({
        title: 'A Second Book',
        author: 'john doe',
        description: 'my second book',
        price: 2,
      }),
    ]);
    const estimates = await service.estimates([
      {
        book_id: books[0].id,
        quantity: 1,
      },
      {
        book_id: books[1].id,
        quantity: 2,
      },
    ]);
    expect(estimates.total_price).toBe(5);
    expect(estimates.items_quantity).toBe(2);
    expect(estimates.items).toEqual(
      expect.arrayContaining([
        {
          book_id: books[0].id,
          quantity: 1,
          unity_price: 1,
          total_price: 1,
          title: 'A Book',
          author: 'john doe',
        },
        {
          book_id: books[1].id,
          quantity: 2,
          unity_price: 2,
          total_price: 4,
          title: 'A Second Book',
          author: 'john doe',
        },
      ]),
    );
  });
});
