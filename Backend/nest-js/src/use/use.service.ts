import { Injectable } from '@nestjs/common';
import { CreateUseDto } from './dto/create-use.dto';
import { UpdateUseDto } from './dto/update-use.dto';

@Injectable()
export class UseService {
  create(createUseDto: CreateUseDto) {
    return 'This action adds a new use';
  }

  findAll() {
    return `This action returns all use`;
  }

  findOne(id: number) {
    return `This action returns a #${id} use`;
  }

  update(id: number, updateUseDto: UpdateUseDto) {
    return `This action updates a #${id} use`;
  }

  remove(id: number) {
    return `This action removes a #${id} use`;
  }
}
