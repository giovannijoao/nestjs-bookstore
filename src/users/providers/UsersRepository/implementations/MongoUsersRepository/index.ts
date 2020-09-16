import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import CreateUserDTO from '../../dtos/CreateUserDTO';
import IUsersRepository from '../../IUsersRepository';
import { User } from './schemas/user.schema';

export default class MongoUsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly UserSchema: Model<User>,
  ) {}

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const insertedUser = new this.UserSchema({
      userId: uuidv4(),
      name,
      email,
      password,
    });
    await insertedUser.save();
    return insertedUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.UserSchema.findOne({
      email,
    });
    return user;
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = await this.UserSchema.findOne({
      userId,
    });
    return user;
  }

  async save(user: User): Promise<User> {
    await this.UserSchema.updateOne(
      {
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
      },
      {
        $set: user,
      },
    );
    return user;
  }
}
