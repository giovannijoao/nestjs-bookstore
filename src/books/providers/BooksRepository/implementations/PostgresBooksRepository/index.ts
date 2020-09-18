import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import ICreateBookDTO from '../../dtos/ICreateBookDTO';
import IFindBookDTO from '../../dtos/IFindBookDTO';
import IBooksRepository from '../../IBooksRepository';
import { Book } from './entities/Book.entity';

export default class PostgresBooksRepository implements IBooksRepository {
  constructor(
    @InjectRepository(Book)
    private ormRepository: Repository<Book>,
  ) {}

  async find(filter?: IFindBookDTO): Promise<Book[]> {
    let books: Book[];
    if (filter?.ids) {
      books = await this.ormRepository.find({
        where: {
          id: In(filter.ids),
        },
      });
    } else {
      books = await this.ormRepository.find();
    }
    return books;
  }

  async insert({
    title,
    description,
    author,
    price,
  }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      title,
      description,
      author,
      price,
    });
    await this.ormRepository.save(book);
    return book;
  }

  async save(book: Book): Promise<Book> {
    await this.ormRepository.save(book);
    return book;
  }
}
