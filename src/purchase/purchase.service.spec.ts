import { Test, TestingModule } from '@nestjs/testing';
import AppError from '../shared/models/AppError';
import FakePurchaseRepository from './providers/PurchasesRepository/fakes/FakePurchasesRepository';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import { PurchaseService } from './purchase.service';

const randomBook = {
  id: '1',
  title: 'Any book',
  description: 'A great book',
  author: 'John Doe',
  created_at: new Date(),
  updated_at: new Date(),
};

const randomUser = {
  userId: 'userId-1',
  created_at: new Date(),
  updated_at: new Date(),
  email: 'john-doe@email.com',
  name: 'John Doe',
  password: 'any',
};

describe('PurchaseService', () => {
  let service: PurchaseService;
  let fakePurchasesRepository: FakePurchaseRepository;

  beforeEach(async () => {
    fakePurchasesRepository = new FakePurchaseRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PurchasesRepository,
          useValue: fakePurchasesRepository,
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
          book: randomBook,
          quantity: 1,
        },
      ],
      user: randomUser,
    });
    expect(purchases).toEqual(
      expect.arrayContaining([
        {
          book_id: randomBook.id,
          user_id: randomUser.userId,
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
          book: randomBook,
          quantity: 1,
        },
        {
          book: {
            id: '2',
            title: 'Another Great Book',
            description: '',
            author: 'John Doe 2',
            created_at: new Date(),
            updated_at: new Date(),
          },
          quantity: 2,
        },
      ],
      user: randomUser,
    });
    expect(purchases).toEqual(
      expect.arrayContaining([
        {
          book_id: randomBook.id,
          user_id: randomUser.userId,
          quantity: 1,
          purchased_at: new Date(0),
        },
        {
          book_id: '2',
          user_id: randomUser.userId,
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
            book: randomBook,
            quantity: 0,
          },
        ],
        user: randomUser,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
