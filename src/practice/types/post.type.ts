import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostType {
  @Field()
  id: number;

  @Field()
  nickname: string;

  @Field()
  text: string;

  @Field(() => Date)
  date: Date;
}
