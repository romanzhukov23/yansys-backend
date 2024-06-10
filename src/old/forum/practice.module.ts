import { Module } from '@nestjs/common';
import { PracticeResolver } from './practice.resolver';
import { GetPostsUsecase } from './usecases/get-posts.usecase';
import { AddPostUsecase } from './usecases/add-post.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './schemas/post.schema';
import { DeletePostUsecase } from './usecases/delete-post.usecase';
import { EditPostUsecase } from './usecases/edit-post.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
  ],
  providers: [
    PracticeResolver,
    GetPostsUsecase,
    AddPostUsecase,
    DeletePostUsecase,
    EditPostUsecase,
  ],
})
export class PracticeModule {}
