import { Injectable } from '@nestjs/common';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendario } from './entities/calendario.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CalendarioService {
  constructor(
    @InjectRepository(Calendario) 
    private readonly calendarioRepository: Repository<Calendario>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}
  async create(createCalendarioDto: CreateCalendarioDto) {
    const usuario = await this.userRepository.findOneBy({id: createCalendarioDto.user_id})
    if (!usuario) {
      throw new Error('User not found');
    }
   const newCalendario = this.calendarioRepository.create(
    {
      nombre: createCalendarioDto.nombre,
      fecha: createCalendarioDto.fecha_creacion,
      usuario,
      errores_leves: 0,
      errores_graves: 0,
      errores_moderados: 0,
      calidad: 100,
    }
   );
   const savedCalendario = await this.calendarioRepository.save(newCalendario);

    
  return savedCalendario.id;
  }

  async findAll() {
    return await this.calendarioRepository.find({
      relations: ['usuario', 'relaciones', 'columnas'],});
  }

  findOne(id: number) {
    return `This action returns a #${id} calendario`;
  }

  update(id: number, updateCalendarioDto: UpdateCalendarioDto) {
    return `This action updates a #${id} calendario`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendario`;
  }
}
