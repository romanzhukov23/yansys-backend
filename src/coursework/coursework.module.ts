import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, instrumentSchema } from './schemas/instrument.schema';
import { ImportInstrumentsUsecase } from './usecases/import-instruments.usecase';
import { CourseworkResolver } from './resolvers/coursework.resolver';
import { ConfigModule } from '@nestjs/config';
import { ImportQuotesUsecase } from './usecases/import-quotes.usecase';
import { Quotes, quotesSchema } from './schemas/quotes.schema';
import { GetIndicatorsUsecase } from './usecases/get-indicators.usecase';
import { GetInstrumentsUsecase } from './usecases/get-instruments.usecase';
import { GetQuotesUsecase } from './usecases/get-quotes.usecase';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Instrument.name, schema: instrumentSchema },
      { name: Quotes.name, schema: quotesSchema },
    ]),
  ],
  providers: [
    CourseworkResolver,
    ImportInstrumentsUsecase,
    ImportQuotesUsecase,
    GetIndicatorsUsecase,
    GetInstrumentsUsecase,
    GetQuotesUsecase,
  ],
})
export class CourseworkModule {}
