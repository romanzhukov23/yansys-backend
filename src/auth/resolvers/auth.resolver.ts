import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUsecase } from '../usecases/login.usecase';
import { GetUserInfoUsecase } from '../usecases/get-user-info.usecase';
import { UserType } from '../types/user.type';

@Resolver()
export class AuthResolver {
  constructor(
    private loginUsecase: LoginUsecase,
    private getUserInfoUsecase: GetUserInfoUsecase,
  ) {}

  @Query(() => UserType)
  async getUserInfo(@Args('firstname') firstname: string) {
    return this.getUserInfoUsecase.execute(firstname);
  }

  @Mutation(() => Number)
  async login(
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
    @Args('password') password: string,
    @Args('role') role: string,
  ) {
    return this.loginUsecase.execute(firstname, lastname, password, role);
  }
}
