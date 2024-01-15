import { Field, ObjectType } from '@nestjs/graphql';
import { AllArrayType } from './allarray.type';

@ObjectType()
export class IndicatorsType {
  @Field()
  ticker: string;

  // @Field(() => [ArrayType])
  // priceArray: ArrayType[];
  //
  // @Field(() => [ArrayType])
  // emaArray: ArrayType[];
  //
  // @Field(() => [ArrayType])
  // macdArray: ArrayType[];
  //
  // @Field(() => [ArrayType])
  // signalMacdArray: ArrayType[];

  @Field(() => [AllArrayType], { nullable: true })
  AllArray?: AllArrayType[];

  @Field()
  period: number;
}
