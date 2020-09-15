/* eslint-disable import/no-extraneous-dependencies */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import BooksProvider from './providers/BooksProvider';
import FakeBooksProvider from './providers/BooksProvider/fakes/FakeBooksProvider';

describe('BooksService', () => {
  let service: BooksService;
  let fakeBooksProvider: FakeBooksProvider;

  beforeEach(async () => {
    fakeBooksProvider = new FakeBooksProvider();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BooksProvider,
          useValue: fakeBooksProvider,
        },
        BooksService,
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return book list', async () => {
    await service.create({
      title: 'A Book',
      author: 'john doe',
      description: 'my book',
    });
    const books = await service.getBooks();
    expect(books).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          title: 'A Book',
          author: 'john doe',
          description: 'my book',
        },
      ]),
    );
  });

  it('should be able to create a new book', async () => {
    const book = await service.create({
      title: 'A Book',
      author: 'john doe',
      description: 'my book',
    });
    expect(fakeBooksProvider.insert).toBeCalled();
    expect(book.title).toBe('A Book');
    expect(book.id).toBe(1);
  });
});
