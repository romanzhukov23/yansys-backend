import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImportInstrumentsUsecase } from '../usecases/import-instruments.usecase';
import { ImportQuotesUsecase } from '../usecases/import-quotes.usecase';
import { GetQuotesUsecase } from '../usecases/get-quotes.usecase';
import { GetIndicatorsUsecase } from '../usecases/get-indicators.usecase';
import { GetInstrumentsUsecase } from '../usecases/get-instruments.usecase';
import { QuotesType } from '../types/quotes.type';
import { IndicatorsType } from '../types/indicators.type';
import { InstrumentType } from '../types/instrument.type';

@Resolver()
export class CourseworkResolver {
  constructor(
    private importInstrumentsUsecase: ImportInstrumentsUsecase,
    private importQuotesUsecase: ImportQuotesUsecase,
    private getQuotesUsecase: GetQuotesUsecase,
    private getIndicatorsUsecase: GetIndicatorsUsecase,
    private getInstrumentsUsecase: GetInstrumentsUsecase,
  ) {}

  @Query(() => [String])
  async getInstruments() {
    return await this.getInstrumentsUsecase.execute();
  }

  @Query(() => [QuotesType])
  async getQuotes() {
    return await this.getQuotesUsecase.execute();
  }

  @Query(() => [IndicatorsType])
  async getIndicators() {
    return await this.getIndicatorsUsecase.execute();
  }

  @Mutation(() => [InstrumentType])
  async importInstruments() {
    return await this.importInstrumentsUsecase.execute();
  }

  @Mutation(() => String)
  async importQuotes() {
    return await this.importQuotesUsecase.execute();
  }
}

// new Date(Date.now() - 600000).toISOString()
// new Date(Date.now()).toISOString()
