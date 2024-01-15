import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AllArrayType {
  @Field()
  price: number;

  @Field(() => Date)
  time: Date;

  @Field({ nullable: true })
  ema?: number;

  @Field({ nullable: true })
  macd?: number;

  @Field({ nullable: true })
  signalMacd: number;
}
