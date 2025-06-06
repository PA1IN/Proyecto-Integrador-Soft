import { Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>, // Inject your repository here
  ) {}

  create(createCarreraDto: CreateCarreraDto) {
    return 'This action adds a new carrera';
  }

  findAll() {
    return `This action returns all carrera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrera`;
  }

  update(id: number, updateCarreraDto: UpdateCarreraDto) {
    return `This action updates a #${id} carrera`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrera`;
  }
}
