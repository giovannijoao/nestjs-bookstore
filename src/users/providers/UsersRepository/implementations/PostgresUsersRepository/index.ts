import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import IUsersRepository from '../../IUsersRepository';
import { User } from './entities/User.entity';

export default class PostgresUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private ormRepository: Repository<User>,
  ) {}

  async find(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      name,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(userId: string): Promise<User> {
    return this.ormRepository.findOne(userId);
  }
}
