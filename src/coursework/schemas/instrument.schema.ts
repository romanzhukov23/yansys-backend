import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Instrument {
  @Prop()
  tradeCode: string;

  @Prop()
  figi: string;

  @Prop()
  price: string;
}

export const instrumentSchema = SchemaFactory.createForClass(Instrument);
