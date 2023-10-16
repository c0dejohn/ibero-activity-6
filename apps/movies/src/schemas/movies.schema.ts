import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MoviesRepository {
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

export type MoviesRepositoryDocument = MoviesRepository & Document;

export const MoviesSchema = SchemaFactory.createForClass(MoviesRepository);
