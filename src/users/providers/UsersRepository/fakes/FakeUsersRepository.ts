import { v4 as uuidv4 } from 'uuid';
import CreateUserDTO from '../dtos/CreateUserDTO';
import IUsersRepository from '../IUsersRepository';
import UserModel from '../models/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: UserModel[] = [];

  async create({ name, email, password }: CreateUserDTO): Promise<UserModel> {
    const user = new UserModel();
    user.userId = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;
    user.created_at = new Date(Date.now());
    user.updated_at = new Date(Date.now());
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<UserModel | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<UserModel | undefined> {
    return this.users.find(user => user.userId === id);
  }

  async save(user: UserModel): Promise<UserModel> {
    const index = this.users.findIndex(x => x.userId === user.userId);
    this.users[index] = user;
    return user;
  }
}
