import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from '../schemas/user.schema';
import { EncryptorService } from '../../utils/encryptor.service';

@Injectable()
export class UserRepository {
  private logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name, 'users')
    @InjectConnection('users')
    private readonly UsersModel: Model<UsersDocument>,
    private readonly encryptor: EncryptorService,
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

  async create(email: string, password: string): Promise<User> {
    const decryptedPass = this.encryptor.decryptBody(password);
    const filter = {
      username: email.toLowerCase(),
      decryptedPass,
    };

    const getUser = await this.UsersModel.findOne(filter)
      .lean()
      .exec()
      .catch((err) => {
        this.logger.error('Error on FindOffer by Customer Key');
        this.logger.error(err);
        throw new Error('user already exist');
      });

    await this.UsersModel.create({
      username: email.toLowerCase(),
      password,
    }).catch((err) => {
      this.logger.error(err);
      throw new HttpException('user already exist', 400);
    });
    return getUser;
  }
}
