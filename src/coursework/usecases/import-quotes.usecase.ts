import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quotes } from '../schemas/quotes.schema';
import { Model } from 'mongoose';
// import * as Api from '@tinkoff/invest-openapi-js-sdk';
// import { Candles } from '@tinkoff/invest-openapi-js-sdk';
import { Instrument } from '../schemas/instrument.schema';
import axios from 'axios';

// const apiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox';
// const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const secretToken =
  't.FaTkMqauc3pnXH9F4WHAc1kn_1C8DkpQ3Jgo_Y2zHkZcPfuyFqlgFnvuqJOSHdpIB6oHAG-6n5BWimVYxvV5Ig';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const api = new Api({ apiURL, secretToken, socketURL });

// function ChangeDate(string: string) {
//   let res = string.substring(0, 8);
//   let sp = (parseFloat(string.substring(8, 10)) - 7).toString();
//   sp = sp.length == 1 ? '0' + sp : sp;
//   res += sp + string.substring(10, string.length);
//   return res;
// }

@Injectable()
export class ImportQuotesUsecase {
  constructor(
    @InjectModel(Quotes.name) private quotesModel: Model<Quotes>,
    @InjectModel(Instrument.name)
    private instrumentsModel: Model<Instrument>,
  ) {}

  async execute() {
    // const startDate = ChangeDate(new Date(Date.now()).toISOString()).substring(
    //   0,
    //   10,
    // );
    // const finalDate = new Date(Date.now()).toISOString().substring(0, 10);
    //
    // console.log(startDate, ' ', finalDate);

    await this.quotesModel.deleteMany({});

    const instruments = await this.instrumentsModel.find().limit(20).exec();

    console.log(instruments.length);

    const config = {
      headers: { Authorization: `Bearer ${secretToken}` },
    };
    const quotes: {
      instrument: string;
      candles: {
        // open: number;
        // high: number;
        // low: number;
        close: number;
        // volume: number;
        time: Date;
      }[];
    }[] = [];

    for (const instrument of instruments) {
      const quote = await axios
        .post(
          'https://sandbox-invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles',
          {
            from: '2023-05-09T23:28:52.590Z',
            to: '2023-05-12T23:28:52.590Z',
            interval: 'CANDLE_INTERVAL_HOUR',
            instrumentId: instrument.figi,
          },
          config,
        )
        .then((r) => {
          return {
            instrument: instrument.tradeCode,
            candles: r.data.candles.map((candle) => {
              const closeNano: number = candle.close.nano / 100000;
              const closeUnits: number = parseFloat(candle.close.units);

              const close: number = parseFloat(
                closeUnits.toString() + '.' + closeNano.toString(),
              );
              return {
                close,
                time: candle.time,
              };
            }),
          };
        });

      quotes.push(quote);
    }

    console.log(quotes.length);

    quotes.map(
      async (q, index) =>
        await new this.quotesModel({
          instrument: instruments[index].tradeCode,
          candles: q.candles.map((candle) => ({
            close: candle.close,
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
}
