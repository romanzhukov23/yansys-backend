import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class LoginUsecase {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(
    firstname: string,
    lastname: string,
    password: string,
    role: string,
  ) {
    const exist = await this.userRepository.findOne({
      where: { firstname, lastname },
    });

    let id: number;

    if (!exist) {
      const user = await this.userRepository.save({
        firstname,
        lastname,
        password,
        role,
      });

      console.log(
        `user saved successfully ${user.firstname + ' ' + user.lastname}`,
      );

      const tempId = await this.userRepository.findOne({
        where: { firstname, lastname },
      });

      id = tempId.id;
    } else {
      id = exist.id;
      console.log('user already exist');
    }

    return id;
  }
}
