import { ModuleRef } from '@nestjs/core';
import { BooksRepository } from '../../../books/providers/BooksRepository';
import IBaseTask from '../IBaseTask';

export default class SayHiWorker implements IBaseTask {
  private booksRepository: BooksRepository;

  constructor(private moduleRef: ModuleRef) {
    this.booksRepository = this.moduleRef.get(BooksRepository, {
      strict: false,
    });
  }

  async execute(): Promise<void> {
    const books = await this.booksRepository.find();
    console.log(
      `I'm working. Currently there's ${books.length} books in database.`,
    );
  }
}
