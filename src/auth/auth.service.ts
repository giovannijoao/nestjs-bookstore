import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashProvider } from '../shared/providers/HashProvider';

type User = {
  name: string;
  userId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashProvider: HashProvider,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException(
        'User not found or password is incorret',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatch) {
      throw new HttpException(
        'User not found or password is incorret',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      userId: user.userId,
      name: user.name,
    };
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
