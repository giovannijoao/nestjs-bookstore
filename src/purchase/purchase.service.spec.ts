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

  it('should be able to handle one book purchase', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 0);
    const purchases = await service.create({
      items: [
        {
          book_id: '1',
          quantity: 1,
        },
      ],
      user_id: 'randomUser',
    });
    expect(purchases).toEqual(
      expect.arrayContaining([
        {
          purchase_id: '1',
          book_id: '1',
          user_id: 'randomUser',
          quantity: 1,
          purchased_at: new Date(0),
        },
      ]),
    );
  });

  it('should be able to handle more than one book purchase', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 0);
    const purchases = await service.create({
      items: [
        {
          book_id: '1',
          quantity: 1,
        },
        {
          book_id: '2',
          quantity: 2,
        },
      ],
      user_id: 'randomUser',
    });
    expect(purchases).toEqual(
      expect.arrayContaining([
        {
          purchase_id: '1',
          book_id: '1',
          user_id: 'randomUser',
          quantity: 1,
          purchased_at: new Date(0),
        },
        {
          purchase_id: '2',
          book_id: '2',
          user_id: 'randomUser',
          quantity: 2,
          purchased_at: new Date(0),
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
    expect(estimates.totalPrice).toBe(5);
    expect(estimates.itemsQuantity).toBe(2);
    expect(estimates.items).toEqual(
      expect.arrayContaining([
        {
          book_id: books[0].id,
          quantity: 1,
          unityPrice: 1,
          totalPrice: 1,
          title: 'A Book',
          author: 'john doe',
        },
        {
          book_id: books[1].id,
          quantity: 2,
          unityPrice: 2,
          totalPrice: 4,
          title: 'A Second Book',
          author: 'john doe',
        },
      ]),
    );
  });
});
