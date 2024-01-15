import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async execute(nickname: string, password: string) {
    await this.userEntityRepository.save({
      nickname: nickname,
      password: password,
    });

    return 'ok';
  }
}
