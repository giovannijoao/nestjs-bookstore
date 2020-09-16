import { Injectable } from '@nestjs/common';

type User = {
  userId: number;
  username: string;
  password: string;
};

export type ParsedUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'giovanni',
        password: 'changeme',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = this.users.find(user => user.username === username);
    delete user.password;
    return user;
  }

  async authenticate(username: string, password: string) {
    return this.users.find(user => user.username === username);
  }
}
