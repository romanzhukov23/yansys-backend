import { Module } from '@nestjs/common';
import { MaxResolver } from './resolvers/max.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckAnswersUsecase } from './usecases/check-answers.usecase';
import { UserEntity } from './entities/user.entity';
import { LoginUsecase } from './usecases/login.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [],
  providers: [MaxResolver, CheckAnswersUsecase, LoginUsecase],
})
export class MaxModule {}
