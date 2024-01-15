import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SetQuestionsUsecase } from '../usecases/set-questions.usecase';
import { GetQuestionsUsecase } from '../usecases/get-questions.usecase';
import { CheckAnswersUsecase } from '../usecases/check-answers.usecase';
import { QuestionInputType } from '../types/question.input.type';
import { QuestionType } from '../types/question.type';

@Resolver()
export class CheckYourselfResolver {
  constructor(
    private setQuestionUsecase: SetQuestionsUsecase,
    private getQuestionUsecase: GetQuestionsUsecase,
    private checkAnswerUsecase: CheckAnswersUsecase,
  ) {}

  @Mutation(() => [Number])
  checkAnswer(
    @Args('id') id: string,
    @Args('answer1') answer1: string,
    @Args('answer2') answer2: string,
    @Args('answer3', { type: () => [Boolean] }) answer3: boolean[],
    @Args('answer4') answer4: string,
    @Args('answer5') answer5: string,
    @Args('answer6') answer6: string,
  ) {
    return this.checkAnswerUsecase.execute(
      id,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
    );
  }

  @Mutation(() => Boolean)
  setQuestions(
    @Args('questions', { type: () => QuestionInputType })
    questions: QuestionInputType,
  ) {
    return this.setQuestionUsecase.execute(questions);
  }

  @Query(() => QuestionType)
  getQuestions() {
    return this.getQuestionUsecase.execute();
  }
}
