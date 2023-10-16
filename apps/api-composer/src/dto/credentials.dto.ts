import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';

export class CredentialsDto {
  @Expose()
  @IsDefined()
  @ApiProperty({
    type: String,
    example: 'johndoe@email.com',
  })
  email: string;
  @ApiProperty({
    type: String,
    example: '1234',
  })
  password: string;
}
