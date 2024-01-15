import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TextInputType {
  @Field()
  id: number;

  @Field()
  text: string;
}
