import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionType } from '../types/question.type';

@Injectable()
export class SetQuestionsUsecase {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async execute(questions: QuestionType) {
    await this.questionRepository.delete({});
    await this.questionRepository.save({
      id: 1,
      questions: questions.questions,
      variants1: questions.variants1,
      variants2: questions.variants2,
      variants3: questions.variants3,
      answer1: questions.answer1,
      answer2: questions.answer2,
      answer3: questions.answer3,
      answer4: questions.answer4,
      answer5: questions.answer5,
      answer6: questions.answer6,
    });

    return true;
  }
}
