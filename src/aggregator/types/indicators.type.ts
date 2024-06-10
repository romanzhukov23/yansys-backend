import { Field, ObjectType } from '@nestjs/graphql';
import { BarType, LineType } from './item.type';

@ObjectType()
export class IndicatorsType {
  @Field()
  ticker: string;

  @Field(() => [BarType], { nullable: true })
  price?: BarType[];

  @Field(() => [LineType], { nullable: true })
  ema?: LineType[];

  @Field(() => [LineType], { nullable: true })
  macd?: LineType[];

  @Field(() => [LineType], { nullable: true })
  signal_macd?: LineType[];
}

@ObjectType()
export class LastIndicatorsType {
  @Field()
  ticker: string;

  @Field(() => BarType, { nullable: true })
  price?: BarType;

  @Field(() => LineType, { nullable: true })
  ema?: LineType;

  @Field(() => LineType, { nullable: true })
  macd?: LineType;

  @Field(() => LineType, { nullable: true })
  signal_macd?: LineType;
}
