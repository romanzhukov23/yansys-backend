import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuestionInputType {
  @Field(() => [String])
  questions: string[];

  @Field()
  answer1: number;

  @Field(() => [String])
  variants1: string[];

  @Field()
  answer2: number;

  @Field(() => [String])
  variants2: string[];

  @Field(() => [Number])
  answer3: number[];

  @Field(() => [String])
  variants3: string[];

  @Field()
  answer4: string;

  @Field()
  answer5: string;

  @Field()
  answer6: string;
}
