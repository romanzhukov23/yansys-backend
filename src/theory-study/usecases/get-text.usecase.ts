import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Text } from '../entities/text.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetTextUsecase {
  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>,
  ) {}

  async execute() {
    return await this.textRepository.find({});
  }
}
