import { Module } from '@nestjs/common';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/service/users.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { EncryptorService } from '../utils/encryptor.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ENCRYPTION_KEY'),
        signOptions: { expiresIn: '5m' },
        global: true,
      }),
    }),
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
    MongooseModule.forFeature(
      [{ name: Token.name, schema: TokenSchema }],
      'users',
    ),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    EncryptorService,
    AuthService,
    Object,
  ],
  exports: [AuthService],
})
export class UsersModule {}
