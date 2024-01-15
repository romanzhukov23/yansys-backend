import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextType {
  @Field()
  id: number;

  @Field()
  text: string;
}
