import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './providers/UsersRepository';
import FakeUsersRepository from './providers/UsersRepository/fakes/FakeUsersRepository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersRepository,
          useValue: fakeUsersRepository,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be able to create an user account', async () => {
    const user = await service.create({
      name: 'john doe',
      email: 'john-doe@example.com',
      password: 'johndoe123',
    });
    expect(user.userId).toBeTruthy();
    expect(user.name).toBe('john doe');
  });

  // TODO: It should not able to create an user account with already in use e-mail
});
