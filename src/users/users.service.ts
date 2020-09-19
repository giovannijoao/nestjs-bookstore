import { HttpStatus, Injectable } from '@nestjs/common';
import { HashProvider } from '../shared/providers/HashProvider';
import AppError from '../shared/models/AppError';
import { UsersRepository } from './providers/UsersRepository';
import CreateUserDTO from './providers/UsersRepository/dtos/CreateUserDTO';
import UserModel from './providers/UsersRepository/models/User';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = this.usersRepository.findByEmail(email);
    return user;
  }

  async create({ name, email, password }: CreateUserDTO): Promise<UserModel> {
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
