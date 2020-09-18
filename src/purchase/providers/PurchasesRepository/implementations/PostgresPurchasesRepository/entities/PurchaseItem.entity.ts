import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import IPurchaseItem from '../../../models/IPurchaseItem';
import { Purchase } from './Purchase.entity';

@Entity('purchases_items')
export class PurchaseItem implements IPurchaseItem {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @Column('uuid')
  purchase_id: string;

  @ManyToOne(
    () => Purchase,
    p => p.purchase_id,
  )
  @JoinColumn({
    name: 'purchase_id',
  })
  purchase: Purchase;

  @Column('uuid')
  book_id: string;

  @Column('int')
  quantity: number;

  @Column('float')
  unity_price: number;

  @Column('float')
  total_price: number;
}
