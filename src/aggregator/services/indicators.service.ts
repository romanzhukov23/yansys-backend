import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quotes } from '../schemas/quotes.schema';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';
import { User } from '../schemas/user.schema';
import { Line } from '../schemas/line';
import { Indicators } from '../schemas/indicators.schema';

const emaPeriod = 10;
const k = 2 / (emaPeriod + 1);
// const rsiPeriod = 7;
const macdSPeriod = 10;
const macdLPeriod = 17;
const signalMacdPeriod = 9;

// type Incidators = {
//   ema: number;
//   rsi?: number;
//   macd?: number;
//   stoch?: number;
// };

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectModel(Quotes.name) private quotesModel: Model<Quotes>,
    @InjectModel(Indicators.name) private indicatorsModel: Model<Indicators>,
    @InjectModel(Instrument.name) private instrumentsModel: Model<Instrument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async saveIndicators() {
    await this.indicatorsModel.deleteMany({});

    const tickers = await this.quotesModel.find().exec();

    for (const ticker of tickers) {
      const priceArray = ticker.candles.map((c) => ({
        value: c.close,
        time: c.time,
      }));

      const emaArray = this.getEMA(priceArray, emaPeriod, k);
      const macdArray = this.getMACD(priceArray, macdSPeriod, macdLPeriod);
      const signalMacdArray = this.getSignalMACD(macdArray, signalMacdPeriod);

      await new this.indicatorsModel({
        instrument: ticker.instrument,
        ema: emaArray,
        macd: macdArray,
        signal_macd: signalMacdArray,
      }).save();
    }

    return 'ok';
  }

  async getLastIndicators(username?: string) {
    let tickers: Quotes[];

    if (username) {
      const user = await this.userModel.findOne({ username }).exec();
      tickers = await this.quotesModel
        .find({ instrument: { $in: user.favorites.map((i) => i.tradeCode) } })
        .exec();
    } else {
      tickers = await this.quotesModel.find().exec();
    }

    const res = [];

    for (const ticker of tickers) {
      const price = ticker.candles.pop();
      const indicators = await this.indicatorsModel
        .findOne({
          instrument: ticker.instrument,
        })
        .exec();
      res.push({
        ticker: ticker.instrument,
        price,
        ema: indicators.ema.pop(),
        macd: indicators.macd.pop(),
        signal_macd: indicators.signal_macd.pop(),
      });
    }

    return res;
  }

  async getIndicatorsByTicker(instrument: string) {
    const ticker = await this.quotesModel.findOne({ instrument }).exec();
    const price = ticker.candles;
    const indicators = await this.indicatorsModel
      .findOne({
        instrument: ticker.instrument,
      })
      .exec();
    return {
      ticker: ticker.instrument,
      price,
      ema: indicators.ema,
      macd: indicators.macd,
      signal_macd: indicators.signal_macd,
    };
  }

  sumOfArray(array: number[]) {
    return array.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
  }

  getEMA(candles: Line[], emaPeriod: number, k: number) {
    const emaArray: Line[] = [];

    emaArray[0] = {
      time: candles[emaPeriod].time,
      value:
        this.sumOfArray(candles.map((c) => c.value).slice(0, emaPeriod)) /
        emaPeriod,
    };

    for (let j = 1; j < candles.length - emaPeriod; j++) {
      emaArray[j] = {
        time: candles[emaPeriod + j].time,
        value:
          candles[emaPeriod + j].value * k + emaArray[j - 1].value * (1 - k),
      };
    }

    return emaArray;
  }

  getMACD(candles: Line[], macdSPeriod: number, macdLPeriod: number) {
    const emaS = this.getEmaForMacd(
      macdSPeriod,
      candles.map((el) => ({ time: el.time, value: el.value })),
    );
    const emaL = this.getEmaForMacd(
      macdLPeriod,
      candles.map((el) => ({ time: el.time, value: el.value })),
    );

    const macdArray: Line[] = [];
    for (let i = 0; i < emaL.length; i++) {
      macdArray.push({
        value: emaS[i + macdLPeriod - macdSPeriod].value - emaL[i].value,
        time: emaL[i].time,
      });
    }

    return macdArray;
  }

  getSignalMACD(macd: Line[], signalMacdPeriod: number) {
    const signalMacd: Line[] = [];
    signalMacd[0] = {
      value:
        this.sumOfArray(macd.map((m) => m.value).slice(0, signalMacdPeriod)) /
        signalMacdPeriod,
      time: macd[signalMacdPeriod].time,
    };
    for (let j = 1; j < macd.length - signalMacdPeriod; j++) {
      signalMacd[j] = {
        value:
          macd[signalMacdPeriod + j].value * k +
          signalMacd[j - 1].value * (1 - k),
        time: macd[signalMacdPeriod + j].time,
      };
    }

    console.log('signalMACD ok');

    return signalMacd;
  }

  getEmaForMacd(period: number, Arr: { time: Date; value: number }[]) {
    const k = 2 / (period + 1);

    const pricesOfTicker = Arr.map((p) => p.value);
    const emaArray: { value: number; time: Date }[] = [];
    emaArray[0] = {
      value: this.sumOfArray(pricesOfTicker.slice(0, period)) / period,
      time: Arr[period].time,
    };
    for (let j = 1; j < pricesOfTicker.length - period; j++) {
      emaArray[j] = {
        value: pricesOfTicker[j] * k + emaArray[j - 1].value * (1 - k),
        time: Arr[period + j].time,
      };
    }
    return emaArray;
  }
}
