import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IndicatorsService } from '../services/indicators.service';
import { IndicatorsType, LastIndicatorsType } from '../types/indicators.type';

@Resolver()
export class IndicatorsResolver {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Mutation(() => String)
  async saveIndicators() {
    return await this.indicatorsService.saveIndicators();
  }

  @Query(() => [LastIndicatorsType])
  async getLastIndicators() {
    return await this.indicatorsService.getLastIndicators();
  }

  @Query(() => [LastIndicatorsType])
  async getLastFavoriteIndicators(@Args('username') username: string) {
    return await this.indicatorsService.getLastIndicators(username);
  }

  @Query(() => IndicatorsType)
  async getIndicatorsByTicker(@Args('ticker') ticker: string) {
    return await this.indicatorsService.getIndicatorsByTicker(ticker);
  }
}
