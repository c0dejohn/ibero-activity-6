import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from '../schemas/user.schema';
import { EncryptorService } from '../../utils/encryptor.service';
import { AuthService } from '../auth/auth.service';
import { Token, TokenDocument } from '../schemas/token.schema';

@Injectable()
export class UserRepository {
  private logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name, 'users')
    @InjectConnection('users')
    private readonly UsersModel: Model<UsersDocument>,
    @InjectModel(Token.name, 'users')
    @InjectConnection('users')
    private readonly TokenModel: Model<TokenDocument>,
    private readonly encryptor: EncryptorService,
    private readonly authService: AuthService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const filter = {
      username: email,
    };
    this.logger.log('@findByEmail Filter Data');
    this.logger.log(filter);
    const getUser = await this.UsersModel.findOne(filter, {
      password: 0,
      _id: 0,
    })
      .lean()
      .exec()
      .catch((err) => {
        this.logger.error('Error on findByEmail by Customer Key');
        this.logger.error(err);
        throw new Error('Error on findByEmail by Customer Key');
      });
    if (getUser === null) throw new HttpException('user not found', 206);

    this.logger.log('@findByEmail ', email);
    this.logger.log('@findByEmail response', getUser);
    return getUser;
  }

  async create(email: string, password: string): Promise<void> {
    await this.UsersModel.create({
      username: email.toLowerCase(),
      password: this.encryptor.encryptBody(password),
    })
      .catch((err) => {
        this.logger.error(err);
        throw new HttpException('user already exist', 400);
      })
      .then((result) => {
        return { msg: 'User created successfully' };
      });
  }

  async validateUser(email: string, pass: string) {
    const filter = {
      username: email,
    };

    const user = await this.UsersModel.findOne(filter).lean().exec();

    if (user) {
      const decryptedPass = this.encryptor.decryptBody(user.password);
      const token = await this.authService.signIn(email);
      await this.TokenModel.create({ access_token: token });
      return decryptedPass === pass
        ? { isValid: true, access_token: token }
        : { isValid: false };
    }
    return { isValid: false };
  }
}
