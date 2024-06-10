import { Field, ObjectType } from '@nestjs/graphql';
import { CandleType } from './candle.type';

@ObjectType()
export class QuotesType {
  @Field()
  instrument: string;

  @Field(() => [CandleType])
  candles: CandleType[];
}
