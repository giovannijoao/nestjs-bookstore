/* eslint-disable import/no-extraneous-dependencies */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepository } from './providers/BooksRepository';
import FakeBooksProvider from './providers/BooksRepository/fakes/FakeBooksProvider';

describe('BooksService', () => {
  let service: BooksService;
  let fakeBooksProvider: FakeBooksProvider;

  beforeEach(async () => {
    fakeBooksProvider = new FakeBooksProvider();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BooksRepository,
          useValue: fakeBooksProvider,
        },
        BooksService,
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return book list', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 0);
    await service.create({
      title: 'A Book',
      author: 'john doe',
      description: 'my book',
      price: 1,
    });
    const books = await service.getBooks();
    expect(books).toEqual(
      expect.arrayContaining([
        {
          id: '1',
          title: 'A Book',
          author: 'john doe',
          description: 'my book',
          price: 1,
          created_at: new Date(0),
          updated_at: new Date(0),
        },
      ]),
    );
  });

  it('should be able to create a new book', async () => {
    const spy = jest.spyOn(fakeBooksProvider, 'insert');
    const book = await service.create({
      title: 'A Book',
      author: 'john doe',
      description: 'my book',
      price: 1,
    });
    expect(spy).toBeCalled();
    expect(book.title).toBe('A Book');
    expect(book.id).toBe('1');
  });
});
