import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class CheckAnswersUsecase {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    id: string,
    answer1: string,
    answer2: string,
    answer3: boolean[],
    answer4: string,
    answer5: string,
    answer6: string,
  ) {
    const marks: number[] = [0, 0, 0, 0, 0, 0];
    const answers = [answer1, answer2, '', answer4, answer5, answer6];
    const data = await this.questionRepository.find({});
    const questions: Question = data[0];
    const answersBD = [
      questions.answer1.toString(),
      questions.answer2.toString(),
      '',
      questions.answer4,
      questions.answer5,
      questions.answer6,
    ];

    for (let i = 0; i < 2; i++) {
      marks[i] = answers[i] === answersBD[i] ? 1 : 0;
    }
    for (let i = 0; i < questions.answer3.length; i++) {
      if (answer3[questions.answer3[i]] === true) marks[2]++;
    }
    for (let i = 3; i < 6; i++) {
      marks[i] = answers[i] === answersBD[i] ? 2 : 0;
    }

    let score = 0;
    for (let i = 0; i < marks.length; i++) score += marks[i];

    let questans: string[] = [];

    questans[0] =
      questions.questions[0] + ' ' + questions.variants1[Number(answer1)];
    questans[1] =
      questions.questions[1] + ' ' + questions.variants2[Number(answer1)];

    questans[2] = questions.questions[2];
    for (let i = 0; i < questions.answer3.length; i++) {
      questans[2] += answer3[i] === true ? questions.variants3[i] + '; ' : '';
    }

    for (let i = 3; i < 6; i++) {
      questans[i] = questions.questions[i] + ' ' + answers[i];
    }

    await this.userRepository.save({
      id: Number(id),
      score,
      lasttestdate: new Date(Date.now()).toString(),
      questans,
    });

    return marks;
  }
}
