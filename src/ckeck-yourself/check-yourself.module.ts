import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { CheckYourselfResolver } from './resolvers/check-yourself.resolver';
import { SetQuestionsUsecase } from './usecases/set-questions.usecase';
import { GetQuestionsUsecase } from './usecases/get-questions.usecase';
import { CheckAnswersUsecase } from './usecases/check-answers.usecase';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, User])],
  providers: [
    CheckYourselfResolver,
    SetQuestionsUsecase,
    GetQuestionsUsecase,
    CheckAnswersUsecase,
  ],
})
export class CheckYourselfModule {}
