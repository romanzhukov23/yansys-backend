import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuotesService } from '../services/quotes.service';
import { QuotesType } from '../types/quotes.type';

@Resolver()
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @Mutation(() => String)
  async importQuotes() {
    return await this.quotesService.importQuotes();
  }

  @Mutation(() => String)
  async updateQuotes() {
    await this.quotesService.updateQuotes();
    return 'ok';
  }

  @Query(() => [QuotesType])
  async getQuotes() {
    return await this.quotesService.getQuotes();
  }

  @Query(() => QuotesType)
  async getQuotesByTicker(@Args('ticker') ticker: string) {
    return await this.quotesService.getQuotesByTicker(ticker);
  }

  @Query(() => String)
  async testQuotes() {
    await this.quotesService.testQuotes();
    return 'ok';
  }
}
