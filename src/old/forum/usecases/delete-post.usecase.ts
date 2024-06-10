import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { PostInputType } from '../types/post.input.type';

@Injectable()
export class DeletePostUsecase {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async execute(post: PostInputType) {
    await this.postModel.deleteOne({
      nickname: post.nickname,
      date: post.date,
      text: post.text,
    });
  }
}
