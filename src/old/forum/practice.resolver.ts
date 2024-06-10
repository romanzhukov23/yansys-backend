import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddPostUsecase } from './usecases/add-post.usecase';
import { GetPostsUsecase } from './usecases/get-posts.usecase';
import { PostInputType } from './types/post.input.type';
import { PostType } from './types/post.type';
import { DeletePostUsecase } from './usecases/delete-post.usecase';
import { EditPostUsecase } from './usecases/edit-post.usecase';

@Resolver()
export class PracticeResolver {
  constructor(
    private addPostUsecase: AddPostUsecase,
    private getPostsUsecase: GetPostsUsecase,
    private deletePostUsecase: DeletePostUsecase,
    private editPostUsecase: EditPostUsecase,
  ) {}

  @Query(() => [PostType])
  async getPosts() {
    return await this.getPostsUsecase.execute();
  }

  @Mutation(() => [PostType])
  async addPost(
    @Args('post', { type: () => PostInputType })
    post: PostInputType,
  ) {
    return await this.addPostUsecase.execute(post);
  }

  @Mutation(() => String)
  async deletePost(
    @Args('post', { type: () => PostInputType })
    post: PostInputType,
  ) {
    await this.deletePostUsecase.execute(post);
    return 'deleted';
  }

  @Mutation(() => String)
  async editPost(
    @Args('post', { type: () => PostInputType })
    post: PostInputType,
  ) {
    await this.editPostUsecase.execute(post);
    return 'edited';
  }
}
