import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import UserModel from '../../../models/User';

@Schema()
export class User extends Document implements UserModel {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
