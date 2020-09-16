import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { UsersRepository } from '../users/providers/UsersRepository';
import FakeUsersRepository from '../users/providers/UsersRepository/fakes/FakeUsersRepository';
import { HashProvider } from '../shared/providers/HashProvider';
import FakeHashProvider from '../shared/providers/HashProvider/fakes/FakeHashProvider';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '60s',
          },
        }),
      ],
      providers: [
        {
          provide: UsersRepository,
          useValue: fakeUsersRepository,
        },
        AuthService,
        {
          provide: HashProvider,
          useValue: new FakeHashProvider(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be able to login', async () => {
    const fakeUser = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john-doe@example.com',
      password: 'johndoe123',
    });
    const result = await service.validateUser(
      fakeUser.email,
      fakeUser.password,
    );
    expect(result.userId).toBe(fakeUser.userId);
  });

  it('should not be able to login with wrong password', async () => {
    const fakeUser = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john-doe@example.com',
      password: 'johndoe123',
    });
    await expect(
      service.validateUser(fakeUser.email, 'another password'),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('should not be able to login with non-existing account', async () => {
    await expect(
      service.validateUser(
        'john-doe-fake-account@example.com',
        'another password',
      ),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
