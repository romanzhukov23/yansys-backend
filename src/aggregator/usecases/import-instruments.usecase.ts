import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TinkoffInvestApi } from 'tinkoff-invest-api';
import { InstrumentStatus } from 'tinkoff-invest-api/cjs/generated/instruments';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImportInstrumentsUsecase {
  constructor(
    @InjectModel(Instrument.name)
    private instrumentsModel: Model<Instrument>,
    private configService: ConfigService,
  ) {}

  async execute() {
    await this.instrumentsModel.deleteMany({});

    const api = new TinkoffInvestApi({
      token: this.configService.get('API_KEY'),
    });

    const instruments = await api.instruments.shares({
      instrumentStatus: InstrumentStatus.INSTRUMENT_STATUS_BASE,
    });

    const russian = instruments.instruments.filter(
      (inst) => inst.countryOfRisk === 'RU' && inst.currency === 'rub',
    );

    const lastPrices = await api.marketdata
      .getLastPrices({ figi: russian.map((s) => s.figi) })
      .then((r) =>
        r.lastPrices.map((p) => ({
          figi: p.figi,
          price:
            p.price.units.toString() +
            ',' +
            p.price.nano.toString().slice(0, 4),
        })),
      );

    console.log(russian.length);

    russian.map(
      async (r) =>
        await new this.instrumentsModel({
          tradeCode: r.ticker,
          figi: r.figi,
          price: lastPrices.filter((value) => value.figi === r.figi)[0].price,
          id: r.uid,
        }).save(),
    );

    return russian.map((r) => ({
      tradeCode: r.ticker,
      figi: r.figi,
      price: lastPrices.filter((value) => value.figi === r.figi)[0].price,
    }));
  }
}
