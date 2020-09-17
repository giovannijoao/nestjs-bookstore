import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashProvider } from '../shared/providers/HashProvider';
import { UsersRepository } from './providers/UsersRepository';
import {
  User,
  UserSchema,
} from './providers/UsersRepository/implementations/MongoUsersRepository/schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersRepository, UsersService, HashProvider],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
