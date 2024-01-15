import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Text } from '../entities/text.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SetTextUsecase {
  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>,
  ) {}

  async execute(divs: { id: number; text: string }[]) {
    for (let i = 0; i < divs.length; i++) {
      await this.textRepository.save({
        id: i + 1,
        text: divs[i].text,
      });
    }

    return true;
  }
}
