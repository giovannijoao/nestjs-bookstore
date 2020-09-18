import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import AppError from '../shared/models/AppError';
import CreateUserDTO from './providers/UsersRepository/dtos/CreateUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<any> {
    await this.usersService.create(user);
    return {
      message: 'Account created. Now, you can login.',
    };
  }
}
