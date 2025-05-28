import { Injectable } from '@nestjs/common';
import { CreateColumnaDto } from './dto/create-columna.dto';
import { UpdateColumnaDto } from './dto/update-columna.dto';
import { AsociarColumnaDto } from './dto/asociar-columna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendario } from '../calendario/entities/calendario.entity';
import { Repository } from 'typeorm';
import { Columna } from './entities/columna.entity';
@Injectable()
export class ColumnasService {
  constructor(
    @InjectRepository(Calendario)
    private readonly calendarioRepository: Repository<Calendario>, // Inject your repository here
    @InjectRepository(Columna)
    private readonly columnaRepository: Repository<Columna>, // Inject your repository here
  ) {}



 async  create(asociar: AsociarColumnaDto) {
  const calendario = await this.calendarioRepository.findOneBy({id: asociar.calendarioId});
  if (!calendario) {
    throw new Error('Calendario not found');
  }
   const columnas = asociar.columnas.map(columnaDto =>
    this.columnaRepository.create({
      ...columnaDto,
      calendario,
    }),
  );
  return await this.columnaRepository.save(columnas);

  }

  async findAll() {
    return await this.columnaRepository.find();
  }
  async findByCalendario(calendarioId: number) {
    const calendario = await this.calendarioRepository.findOne({
      where: { id: calendarioId },
      relations: ['columnas'],
    });
  }
  async findOne(id: number) {
    const columna = await this.columnaRepository.findOne({
      where: { id },})
    return ;
  }

  update(id: number, updateColumnaDto: UpdateColumnaDto) {
    return `This action updates a #${id} columna`;
  }

  remove(id: number) {
    return `This action removes a #${id} columna`;
  }
}
