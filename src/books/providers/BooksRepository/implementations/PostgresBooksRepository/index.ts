import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ICreateBookDTO from '../../dtos/ICreateBookDTO';
import IBooksRepository from '../../IBooksRepository';
import { Book } from './entities/Book.entity';

export default class PostgresBooksRepository implements IBooksRepository {
  constructor(
    @InjectRepository(Book)
    private ormRepository: Repository<Book>,
  ) {}

  async find(): Promise<Book[]> {
    const books = await this.ormRepository.find();
    return books;
  }

  async insert({ title, description, author }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      title,
      description,
      author,
    });
    await this.ormRepository.save(book);
    return book;
  }

  async save(book: Book): Promise<Book> {
    await this.ormRepository.save(book);
    return book;
  }
}
