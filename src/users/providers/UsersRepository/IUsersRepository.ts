import ICreateUserDTO from './dtos/CreateUserDTO';
import UserModel from './models/User';

export default interface IUsersRepository {
  /** Find user by primary key */
  findById(userId: string): Promise<UserModel | undefined>;
  /** Find user by email */
  findByEmail(email: string): Promise<UserModel | undefined>;
  /** Create an user */
  create(data: ICreateUserDTO): Promise<UserModel>;
  /** Saves an user after updating some property */
  save(data: UserModel): Promise<UserModel>;
}
