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
  create(createCalendarioDto: CreateCalendarioDto) {
    const user = this.userRepository.findOneBy({id: createCalendarioDto.user_id})
    if (!user) {
      throw new Error('User not found');
    }
   const newCalendario = this.calendarioRepository.create(
    {
      nombre: createCalendarioDto.nombre,
      fecha: createCalendarioDto.fecha_creacion,
      user,
      errores_leves: 0,
      errores_graves: 0,
      errores_moderados: 0,
      calidad: 100,
      
      



    }

      
   );

    




    return 'This action adds a new calendario';
  }

  findAll() {
    return `This action returns all calendario`;
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
