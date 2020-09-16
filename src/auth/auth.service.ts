import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/providers/UsersRepository';
import { HashProvider } from '../shared/providers/HashProvider';

type User = {
  name: string;
  userId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private hashProvider: HashProvider,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
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
