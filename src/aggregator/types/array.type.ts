import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArrayType {
  @Field(() => Date)
  time: Date;

  @Field()
  value: number;
}
