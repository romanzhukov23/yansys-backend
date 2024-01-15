import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { PostInputType } from '../types/post.input.type';

@Injectable()
export class AddPostUsecase {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async execute(post: PostInputType) {
    const len = await this.postModel
      .find()
      .exec()
      .then((res) => res.length);
    await new this.postModel({
      id: len + 1,
      nickname: post.nickname,
      text: post.text,
      date: post.date,
    }).save();

    return await this.postModel.find().exec();
  }
}
