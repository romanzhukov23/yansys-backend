import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostInputType {
  @Field()
  nickname: string;

  @Field()
  text: string;

  @Field(() => Date)
  date: Date;
}
