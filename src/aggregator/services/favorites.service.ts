import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Instrument.name) private instrumentsModel: Model<Instrument>,
  ) {}

  async addFavorite(username: string, ticker: string) {
    const instr = await this.instrumentsModel.findOne({ tradeCode: ticker });
    const user = await this.userModel.findOne({ username });

    await this.userModel.updateOne(
      { username },
      { favorites: [...user.favorites, instr] },
    );

    return 'added';
  }

  async deleteFavorite(username: string, ticker: string) {
    const user = await this.userModel.findOne({ username });
    const newFavorites = user.favorites.filter((i) => i.tradeCode !== ticker);

    await this.userModel.updateOne(
      { username },
      { favorites: [...newFavorites] },
    );

    return 'deleted';
  }

  async isFavorite(username: string, ticker: string) {
    const user = await this.userModel.findOne({ username }).exec();
    return user.favorites.map((f) => f.tradeCode).includes(ticker);
  }
}
