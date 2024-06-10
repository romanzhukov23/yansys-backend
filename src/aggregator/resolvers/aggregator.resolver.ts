import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImportInstrumentsUsecase } from '../usecases/import-instruments.usecase';
import { GetInstrumentsUsecase } from '../usecases/get-instruments.usecase';
import { InstrumentType } from '../types/instrument.type';
import { LoginUsecase } from '../usecases/login.usecase';
import { FavoritesService } from '../services/favorites.service';

@Resolver()
export class AggregatorResolver {
  constructor(
    private importInstrumentsUsecase: ImportInstrumentsUsecase,
    private getInstrumentsUsecase: GetInstrumentsUsecase,
    private loginUsecase: LoginUsecase,
    private favoritesService: FavoritesService,
  ) {}

  @Query(() => [String])
  async getInstruments() {
    return await this.getInstrumentsUsecase.execute();
  }

  // @Query(() => [IndicatorsType])
  // async getIndicators() {
  //   return await this.indicatorsService.getIndicators();
  // }

  @Mutation(() => [InstrumentType])
  async importInstruments() {
    return await this.importInstrumentsUsecase.execute();
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.loginUsecase.execute(username, password);
  }

  @Mutation(() => String)
  async addFavorite(
    @Args('username') username: string,
    @Args('ticker') ticker: string,
  ) {
    return await this.favoritesService.addFavorite(username, ticker);
  }

  @Mutation(() => String)
  async deleteFavorite(
    @Args('username') username: string,
    @Args('ticker') ticker: string,
  ) {
    return await this.favoritesService.deleteFavorite(username, ticker);
  }

  @Query(() => Boolean)
  async isFavorite(
    @Args('username') username: string,
    @Args('ticker') ticker: string,
  ) {
    return await this.favoritesService.isFavorite(username, ticker);
  }
}

// new Date(Date.now() - 600000).toISOString()
// new Date(Date.now()).toISOString()
