import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import IBook from '../../../models/Book';

@Schema()
export class Book extends Document implements IBook {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
