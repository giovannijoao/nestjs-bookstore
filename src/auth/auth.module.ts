import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashProvider } from '../shared/providers/HashProvider';
import { UsersModule } from '../users/users.module';
import BCryptHashProvider from '../shared/providers/HashProvider/implementations/BCryptHashProvider';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: HashProvider,
      useValue: BCryptHashProvider,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
