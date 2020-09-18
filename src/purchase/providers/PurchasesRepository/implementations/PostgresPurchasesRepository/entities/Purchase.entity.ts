import {
  Entity,
  CreateDateColumn,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../../../../../books/providers/BooksRepository/implementations/PostgresBooksRepository/entities/Book.entity';
import { User } from '../../../../../../users/providers/UsersRepository/implementations/PostgresUsersRepository/entities/User.entity';
import IPurchase from '../../../models/IPurchase';

@Entity('purchases')
export class Purchase implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  purchase_id: string;

  @OneToOne(
    type => Book,
    book => book.id,
  )
  @Column('uuid')
  book_id: string;

  @OneToOne(
    type => User,
    user => user.userId,
  )
  @Column('uuid')
  user_id: string;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  purchased_at: Date;
}
