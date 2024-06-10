import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LineType {
  @Field()
  value: number;

  @Field(() => Date)
  time: Date;
}

@ObjectType()
export class BarType {
  @Field()
  open: number;

  @Field()
  close: number;

  @Field()
  high: number;

  @Field()
  low: number;

  @Field(() => Date)
  time: Date;
}
