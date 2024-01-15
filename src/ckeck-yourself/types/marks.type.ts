import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarksType {
  @Field()
  mark1: string;

  @Field()
  mark2: string;

  @Field()
  mark3: string;

  @Field()
  mark4: string;

  @Field()
  mark5: string;

  @Field()
  mark6: string;
}
