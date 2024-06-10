import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LoginUsecase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      await new this.userModel({
        username,
        password,
      }).save();
      return 'ok';
    } else {
      if (password === user.password) {
        return 'ok';
      } else {
        return 'invalid password';
      }
    }
  }
}
