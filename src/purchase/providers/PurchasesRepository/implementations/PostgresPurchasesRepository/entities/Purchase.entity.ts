import {
  Entity,
  CreateDateColumn,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../../../../../../users/providers/UsersRepository/implementations/PostgresUsersRepository/entities/User.entity';
import IPurchase from '../../../models/IPurchase';
import { PurchaseItem } from './PurchaseItem.entity';

@Entity('purchases')
export class Purchase implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  purchase_id: string;

  @Column('uuid')
  user_id: string;

  @Column('int')
  quantity: number;

  @Column('float')
  total_price: number;

  @CreateDateColumn()
  purchased_at: Date;

  @OneToMany(
    () => PurchaseItem,
    p => p.purchase,
    {
      cascade: true,
    },
  )
  items: PurchaseItem[];
}
