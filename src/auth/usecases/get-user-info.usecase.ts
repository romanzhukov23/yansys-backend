import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserInfoUsecase {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(firstname: string) {
    const user = await this.userRepository.findOne({ where: { firstname } });

    if (!user) {
      throw new Error('user is not in DB');
    }

    console.log('user found in BD');

    return user;
  }
}
