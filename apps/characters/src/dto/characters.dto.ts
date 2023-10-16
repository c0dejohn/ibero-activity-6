import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CharactersDto {
  @IsString()
  picture: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  age: string;
  @IsString()
  history: string;
  @IsArray()
  moviesAssociated: [string];
}
