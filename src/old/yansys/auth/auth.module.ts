import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthResolver } from './resolvers/auth.resolver';
import { LoginUsecase } from './usecases/login.usecase';
import { GetUserInfoUsecase } from './usecases/get-user-info.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, LoginUsecase, GetUserInfoUsecase],
})
export class AuthModule {}
