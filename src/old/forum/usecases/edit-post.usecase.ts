import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { PostInputType } from '../types/post.input.type';

@Injectable()
export class EditPostUsecase {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async execute(post: PostInputType) {
    console.log(post);
    const text = post.text;
    const res = await this.postModel.updateOne(
      { nickname: post.nickname, date: post.date },
      { text },
    );
    console.log(res);
  }
}
