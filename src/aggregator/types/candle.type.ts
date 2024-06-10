import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CandleType {
  @Field()
  open: number;

  @Field()
  high: number;

  @Field()
  low: number;

  @Field()
  close: number;

  // @Field()
  // volume: number;

  @Field()
  time: Date;
}
