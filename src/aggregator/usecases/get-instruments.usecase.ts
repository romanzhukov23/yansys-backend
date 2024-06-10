import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quotes } from '../schemas/quotes.schema';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';

@Injectable()
export class GetInstrumentsUsecase {
  constructor(
    @InjectModel(Quotes.name) private quotesModel: Model<Quotes>,
    @InjectModel(Instrument.name) private instrumentsModel: Model<Instrument>,
  ) {}

  async execute() {
    const instruments = await this.instrumentsModel.find().exec();
    return instruments.map((i) => i.tradeCode);
  }
}
