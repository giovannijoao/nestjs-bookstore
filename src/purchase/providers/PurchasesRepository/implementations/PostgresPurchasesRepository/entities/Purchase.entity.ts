import {
  Entity,
  CreateDateColumn,
  PrimaryColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Book } from '../../../../../../books/providers/BooksRepository/implementations/PostgresBooksRepository/entities/Book.entity';
import { User } from '../../../../../../users/providers/UsersRepository/implementations/PostgresUsersRepository/entities/User.entity';
import IPurchase from '../../../models/IPurchase';

@Entity()
export class Purchase implements IPurchase {
  @OneToOne(
    type => Book,
    book => book.id,
  )
  @PrimaryColumn('uuid')
  book_id: string;

  @OneToOne(
    type => User,
    user => user.userId,
  )
  @PrimaryColumn('uuid')
  user_id: string;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  purchased_at: Date;
}
