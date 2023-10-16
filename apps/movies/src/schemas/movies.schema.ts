import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  title: string;
  @Prop({})
  rating: [1, 2, 3, 4, 5];
  @Prop()
  genre: string;
  @Prop()
  picture: string;
  @Prop()
  characters_associated: [string];
}

export type MovieDocument = Movie & Document;

export const MovieSchema = SchemaFactory.createForClass(Movie);
