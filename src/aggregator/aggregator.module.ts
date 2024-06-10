import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, instrumentSchema } from './schemas/instrument.schema';
import { ImportInstrumentsUsecase } from './usecases/import-instruments.usecase';
import { AggregatorResolver } from './resolvers/aggregator.resolver';
import { ConfigModule } from '@nestjs/config';
import { ImportQuotesUsecase } from './usecases/import-quotes.usecase';
import { Quotes, quotesSchema } from './schemas/quotes.schema';
import { GetInstrumentsUsecase } from './usecases/get-instruments.usecase';
import { GetQuotesUsecase } from './usecases/get-quotes.usecase';
import { User, userSchema } from './schemas/user.schema';
import { LoginUsecase } from './usecases/login.usecase';
import { FavoritesService } from './services/favorites.service';
import { IndicatorsService } from './services/indicators.service';
import { QuotesService } from './services/quotes.service';
import { Indicators, indicatorsSchema } from './schemas/indicators.schema';
import { IndicatorsResolver } from './resolvers/indicators.resolver';
import { QuotesResolver } from './resolvers/quotes.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Instrument.name, schema: instrumentSchema },
      { name: Quotes.name, schema: quotesSchema },
      { name: User.name, schema: userSchema },
      { name: Indicators.name, schema: indicatorsSchema },
    ]),
  ],
  providers: [
    AggregatorResolver,
    IndicatorsResolver,
    QuotesResolver,
    ImportInstrumentsUsecase,
    ImportQuotesUsecase,
    GetInstrumentsUsecase,
    GetQuotesUsecase,
    LoginUsecase,
    FavoritesService,
    IndicatorsService,
    QuotesService,
  ],
})
export class AggregatorModule {}
