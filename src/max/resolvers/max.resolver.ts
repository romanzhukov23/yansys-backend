import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CheckAnswersUsecase } from '../usecases/check-answers.usecase';
import { LoginUsecase } from '../usecases/login.usecase';

@Resolver()
export class MaxResolver {
  constructor(
    private checkAnswersUsecase: CheckAnswersUsecase,
    private loginUsecase: LoginUsecase,
  ) {}

  @Mutation(() => [Number])
  async checkAnswers(
    @Args('nickname') nickname: string,
    @Args('answers', { type: () => [Number] }) answers: number[],
  ) {
    return await this.checkAnswersUsecase.execute(nickname, answers);
  }

  @Mutation(() => String)
  async maxLogin(
    @Args('nickname') nickname: string,
    @Args('password') password: string,
  ) {
    return await this.loginUsecase.execute(nickname, password);
  }
}
