import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class GetPostsUsecase {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async execute() {
    return await this.postModel.find().exec();
  }
}
