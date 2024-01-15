import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './entities/text.entity';
import { TheoryStudyResolver } from './resolvers/theory-study.resolver';
import { SetTextUsecase } from './usecases/set-text.usecase';
import { GetTextUsecase } from './usecases/get-text.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  providers: [TheoryStudyResolver, SetTextUsecase, GetTextUsecase],
})
export class TheoryStudyModule {}
