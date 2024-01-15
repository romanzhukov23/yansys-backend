import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SetTextUsecase } from '../usecases/set-text.usecase';
import { GetTextUsecase } from '../usecases/get-text.usecase';
import { TextType } from '../types/text.type';
import { TextInputType } from '../types/text.input.type';

@Resolver()
export class TheoryStudyResolver {
  constructor(
    private setTextUsecase: SetTextUsecase,
    private getTextUsecase: GetTextUsecase,
  ) {}

  @Query(() => [TextType])
  getText() {
    return this.getTextUsecase.execute();
  }

  @Mutation(() => Boolean)
  async setText(
    @Args('divs', { type: () => [TextInputType] })
    divs: TextInputType[],
  ) {
    return this.setTextUsecase.execute(divs);
  }
}
