import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema({ timestamps: true })
export class Character {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  picture: string;

  @Prop({ required: true })
  age: string;

  @Prop()
  history: string;

  @Prop()
  moviesAssociated: [string];
}

export type CharacterDocument = Character & Document;

export const CharacterSchema = SchemaFactory.createForClass(Character);
CharacterSchema.plugin(uniqueValidator);
CharacterSchema.index({ name: 1 }, { unique: true });
