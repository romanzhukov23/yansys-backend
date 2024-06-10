import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Instrument } from './instrument.schema';

const InstrumentRaw = {
  tradeCode: { type: String },
  figi: { type: String },
  price: { type: String },
};

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  authToken: string;

  @Prop([raw(InstrumentRaw)])
  favorites: Instrument[];
}

export const userSchema = SchemaFactory.createForClass(User);
