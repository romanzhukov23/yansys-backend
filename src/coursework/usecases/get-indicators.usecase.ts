import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quotes } from '../schemas/quotes.schema';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';

type Incidators = {
  ema: number;
  rsi?: number;
  macd?: number;
  stoch?: number;
};

@Injectable()
export class GetIndicatorsUsecase {
  constructor(
    @InjectModel(Quotes.name) private quotesModel: Model<Quotes>,
    @InjectModel(Instrument.name) private instrumentsModel: Model<Instrument>,
  ) {}

  async execute() {
    const emaPeriod = 10;
    const k = 2 / (emaPeriod + 1);
    const rsiPeriod = 7;
    const macdSPeriod = 10;
    const macdLPeriod = 17;
    const signalMacdPeriod = 9;

    const res = [];
    const tickers = await this.quotesModel.find().exec();

    for (const ticker of tickers) {
      const priceArray = ticker.candles.map((c) => ({
        value: c.close,
        time: c.time,
      }));

      let AllArray: {
        price: number;
        time: Date;
        ema?: number;
        macd?: number;
        signalMacd?: number;
      }[] = [
        ...priceArray.map((p) => ({
          price: p.value,
          time: p.time,
        })),
      ];

      const candles = priceArray.map((t) => t.value);
      const dates = priceArray.map((t) => t.time);

      AllArray = this.AddingEma(AllArray, emaPeriod, k, candles);
      AllArray = this.AddingMacd(
        macdSPeriod,
        macdLPeriod,
        signalMacdPeriod,
        AllArray,
      );

      res.push({
        ticker: ticker.instrument,
        AllArray,
        period: emaPeriod,
      });
    }

    return res;
  }

  sumOfArray(array: number[]) {
    return array.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
  }

  AddingEma(
    AllArray: {
      price: number;
      time: Date;
      ema?: number;
    }[],
    emaPeriod: number,
    k: number,
    candles: number[],
  ) {
    AllArray[emaPeriod] = {
      price: AllArray[emaPeriod].price,
      time: AllArray[emaPeriod].time,
      ema: this.sumOfArray(candles.slice(0, emaPeriod)) / emaPeriod,
    };

    for (let j = 1; j < candles.length - emaPeriod; j++) {
      AllArray[emaPeriod + j] = {
        price: AllArray[emaPeriod + j].price,
        time: AllArray[emaPeriod + j].time,
        ema:
          candles[emaPeriod + j] * k +
          AllArray[emaPeriod + j - 1].ema * (1 - k),
      };
    }

    return AllArray;
  }

  AddingMacd(
    macdSPeriod: number,
    macdLPeriod: number,
    signalMacdPeriod: number,
    AllArray: {
      price: number;
      time: Date;
      ema?: number;
      macd?: number;
      signalMacd?: number;
      macdPeriod?: number;
    }[],
  ) {
    const emaS = this.getEma(
      macdSPeriod,
      AllArray.map((el) => ({ time: el.time, price: el.price })),
    );
    const emaL = this.getEma(
      macdLPeriod,
      AllArray.map((el) => ({ time: el.time, price: el.price })),
    );

    const macdArray: { macd: number; LTime: Date; STime: Date }[] = [];
    for (let i = 0; i < emaL.length; i++) {
      macdArray.push({
        macd: emaS[i + 3].ema - emaL[i].ema,
        STime: emaS[i + 3].macdTime,
        LTime: emaL[i].macdTime,
      });
    }

    const period = signalMacdPeriod;
    const k = 2 / (period + 1);
    const signalMacd = [];

    const macd = macdArray.map((m) => m.macd);
    signalMacd[0] = this.sumOfArray(macd.slice(0, period)) / period;
    for (let j = 0; j < macd.length - period; j++) {
      signalMacd[j + 1] = macd[period + j - 1] * k + signalMacd[j] * (1 - k);
    }

    for (let i = 0; i < macdArray.length; i++) {
      AllArray[i + macdLPeriod].macd = macdArray[i].macd;
      if (i >= period) {
        AllArray[i + macdLPeriod].signalMacd = signalMacd[i - period];
      }
    }

    return AllArray;
  }

  getEma(period: number, Arr: { time: Date; price: number }[]) {
    const k = 2 / (period + 1);

    const pricesOfTicker = Arr.map((p) => p.price);
    const emaArray: { ema: number; macdTime: Date }[] = [];
    emaArray[0] = {
      ema: this.sumOfArray(pricesOfTicker.slice(0, period)) / period,
      macdTime: Arr[period].time,
    };
    for (let j = 1; j < pricesOfTicker.length - period; j++) {
      emaArray[j] = {
        ema: pricesOfTicker[j] * k + emaArray[j - 1].ema * (1 - k),
        macdTime: Arr[period + j].time,
      };
    }
    return emaArray;
  }
}
