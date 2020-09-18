import { Test, TestingModule } from '@nestjs/testing';
import AppError from '../shared/models/AppError';
import FakePurchaseRepository from './providers/PurchasesRepository/fakes/FakePurchasesRepository';
import { PurchasesRepository } from './providers/PurchasesRepository/implementations';
import { PurchaseService } from './purchase.service';

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
});
