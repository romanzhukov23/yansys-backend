import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Line } from './line';

const LineRaw = {
  value: { type: Number },
  time: { type: Date },
};

@Schema()
export class Indicators {
  @Prop()
  instrument: string;

  @Prop([raw(LineRaw)])
  ema: Line[];

  @Prop([raw(LineRaw)])
  macd: Line[];

  @Prop([raw(LineRaw)])
  signal_macd: Line[];
}

export const indicatorsSchema = SchemaFactory.createForClass(Indicators);
