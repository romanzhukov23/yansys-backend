import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class CheckAnswersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  rightAnswers = [0, 0, 2, 3, 2, 2, 1, 2, 2, 2];

  async execute(nickname: string, answers: number[]) {
    const marks = answers.map((a, index) =>
      a === this.rightAnswers[index] ? 1 : 0,
    );

    const str: string = ''.concat(...marks.map((m) => m.toString()));

    console.log(str);

    await this.userEntityRepository.update(
      {
        nickname: nickname,
      },
      {
        answers: str,
      },
    );

    return marks;
  }
}
