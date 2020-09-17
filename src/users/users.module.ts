import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashProvider } from '../shared/providers/HashProvider';
import { UsersRepository } from './providers/UsersRepository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './providers/UsersRepository/implementations/PostgresUsersRepository/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersService, HashProvider],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
