import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  id: number;

  @Prop()
  nickname: string;

  @Prop()
  date: Date;

  @Prop()
  text: string;
}

export const postSchema = SchemaFactory.createForClass(Post);
