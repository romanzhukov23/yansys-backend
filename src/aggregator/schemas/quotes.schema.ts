import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Candle } from './candle';

const CandleRaw = {
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  close: { type: Number },
  // volume: { type: Number },
  time: { type: Date },
};

@Schema()
export class Quotes {
  @Prop()
  instrument: string;

  @Prop([raw(CandleRaw)])
  candles: Candle[];
}

export const quotesSchema = SchemaFactory.createForClass(Quotes);
