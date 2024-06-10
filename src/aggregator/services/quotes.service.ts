import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quotes } from '../schemas/quotes.schema';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';
import axios from 'axios';
import { Candle } from '../schemas/candle';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quotes.name) private quotesModel: Model<Quotes>,
    @InjectModel(Instrument.name)
    private instrumentsModel: Model<Instrument>,
    private configService: ConfigService,
  ) {}

  secretToken = this.configService.get('API_KEY');

  async testQuotes() {
    const instrument = await this.instrumentsModel
      .findOne({ tradeCode: 'VKCO' })
      .exec();
    const config = {
      headers: { Authorization: `Bearer ${this.secretToken}` },
    };

    await axios
      .post(
        'https://sandbox-invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles',
        {
          from: '2024-05-29T18:28:52.590Z',
          to: '2024-05-29T19:28:52.590Z',
          interval: 'CANDLE_INTERVAL_HOUR',
          instrumentId: instrument.figi,
        },
        config,
      )
      .then((r) => {
        console.log(r.data.candles);
        console.log(
          +r.data.candles[0].open.units +
            r.data.candles[0].open.nano / 1000000000,
        );
        console.log(r.data.candles[0].open.units);
        console.log(r.data.candles[0].open.nano);
        console.log(r.data.candles[0].open.nano / 1000000000);
      })
      .catch((reason) => console.log(reason));
  }

  async updateQuotes() {
    const instruments = await this.instrumentsModel.find().exec();

    console.log(instruments.length);

    const config = {
      headers: { Authorization: `Bearer ${this.secretToken}` },
    };

    for (const instrument of instruments) {
      const quotesOld = await this.quotesModel
        .findOne({ instrument: instrument.tradeCode })
        .exec();
      const quotes: Candle[] = quotesOld.candles.map((c) => ({
        open: c.open,
        close: c.close,
        high: c.high,
        low: c.low,
        time: c.time,
      }));

      await axios
        .post(
          'https://sandbox-invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles',
          {
            from: '2024-05-21T23:28:52.590Z',
            to: '2024-05-28T23:28:52.590Z',
            interval: 'CANDLE_INTERVAL_HOUR',
            instrumentId: instrument.figi,
          },
          config,
        )
        .then((r) => {
          quotes.push(
            ...r.data.candles.map((candle) => ({
              open: +candle.open.units + candle.open.nano / 1000000000,
              close: +candle.close.units + candle.close.nano / 1000000000,
              high: +candle.high.units + candle.high.nano / 1000000000,
              low: +candle.low.units + candle.low.nano / 1000000000,
              time: candle.time,
            })),
          );
        })
        .catch((reason) => console.log(reason));

      await this.quotesModel.updateOne(
        { instrument: instrument.tradeCode },
        { candles: quotes },
      );
    }
  }

  async importQuotes() {
    // const startDate = ChangeDate(new Date(Date.now()).toISOString()).substring(
    //   0,
    //   10,
    // );
    // const finalDate = new Date(Date.now()).toISOString().substring(0, 10);
    //
    // console.log(startDate, ' ', finalDate);

    await this.quotesModel.deleteMany({});

    const instruments = await this.instrumentsModel.find().exec();

    console.log(instruments.length);

    const config = {
      headers: { Authorization: `Bearer ${this.secretToken}` },
    };
    const quotes: {
      instrument: string;
      candles: {
        open: number;
        high: number;
        low: number;
        close: number;
        // volume: number;
        time: Date;
      }[];
    }[] = [];

    for (const instrument of instruments) {
      await axios
        .post(
          'https://sandbox-invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles',
          {
            from: '2024-04-30T23:28:52.590Z',
            to: '2024-05-07T23:28:52.590Z',
            interval: 'CANDLE_INTERVAL_HOUR',
            instrumentId: instrument.figi,
          },
          config,
        )
        .then((r) => {
          quotes.push({
            instrument: instrument.tradeCode,
            candles: r.data.candles.map((candle) => {
              return {
                open: +candle.open.units + candle.open.nano / 1000000000,
                close: +candle.close.units + candle.close.nano / 1000000000,
                high: +candle.high.units + candle.high.nano / 1000000000,
                low: +candle.low.units + candle.low.nano / 1000000000,
                time: candle.time,
              };
            }),
          });
        })
        .catch((reason) => console.log(reason));
    }

    console.log(quotes.length);

    quotes.map(
      async (q, index) =>
        await new this.quotesModel({
          instrument: instruments[index].tradeCode,
          candles: q.candles.map((candle) => ({
            close: candle.close,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            time: candle.time,
          })),
        }).save(),
    );

    // return quotes.map((q, i) => ({
    //   instrument: instruments[i].tradeCode,
    //   candles: q.candles.map((candle) => ({
    //     close: candle.close,
    //     time: new Date(candle.time),
    //   })),
    // }));
    return 'Yes';
  }

  async getQuotes() {
    return await this.quotesModel.find().exec();
  }

  async getQuotesByTicker(ticker: string) {
    const quotes = await this.quotesModel
      .findOne({ instrument: ticker })
      .exec();
    return {
      instrument: quotes.instrument,
      candles: quotes.candles.map((candle) => ({
        open: candle.open,
        close: candle.close,
        low: candle.low,
        high: candle.high,
        time: candle.time,
      })),
    };
  }
}
