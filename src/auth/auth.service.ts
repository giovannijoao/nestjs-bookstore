import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ParsedUser, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ParsedUser | null> {
    return this.usersService.authenticate(username, password);
  }

  async login(user: ParsedUser) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
