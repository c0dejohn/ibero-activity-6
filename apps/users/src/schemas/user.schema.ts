import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export type UsersDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator);
UserSchema.index({ username: 1 }, { unique: true });
