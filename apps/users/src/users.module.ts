import { Module } from '@nestjs/common';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/service/users.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { EncryptorService } from '../utils/encryptor.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'users',
        autoIndex: true,
      }),
      connectionName: 'users',
    }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'users',
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, EncryptorService],
})
export class UsersModule {}
