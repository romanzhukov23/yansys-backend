import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InstrumentType {
  @Field()
  tradeCode: string;

  @Field()
  figi: string;

  @Field()
  price: string;
}
