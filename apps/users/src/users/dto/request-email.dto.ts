import 'reflect-metadata';
import { IsEmail, IsString } from 'class-validator';
export default class RequestEmailDto {
  public name?: string;
  @IsEmail()
  @IsString()
  public email?: string;
  public subject?: string;
  public message?: string;
}
