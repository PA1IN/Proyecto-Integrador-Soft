import { Injectable } from '@nestjs/common';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendario } from './entities/calendario.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { PruebaDto } from '../evaluacion/dto/crear-prueba.dto';
import { AsignaturaCreada } from '../asignatura/entities/asignatura-creada.entity';
import { AsignaturaFija } from '../asignatura/entities/asignatura-fija.entity';
import { CheckErroresDto } from './dto/checkerrores.dto';

@Injectable()
export class CalendarioService {
  constructor(
    @InjectRepository(Calendario) 
    private readonly calendarioRepository: Repository<Calendario>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    @InjectRepository(AsignaturaCreada)
    private readonly asignaturaCreadaRepository: Repository<AsignaturaCreada>,
    @InjectRepository(AsignaturaFija)
    private readonly asignaturaFijaRepository: Repository<AsignaturaFija>,
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

  private async nivel(prueba: PruebaDto): Promise<number> {
    if (prueba.asignaturaCreadaId) {
      const asignaturaCreada = await this.asignaturaCreadaRepository.findOneBy({ id: prueba.asignaturaCreadaId });
      if (!asignaturaCreada) {
        throw new Error('Asignatura creada no encontrada');
      }
      const nivel = asignaturaCreada.nivel; 
      return nivel;
    } else if (prueba.asignaturaFijaId) {
      const asignaturaFija = await this.asignaturaFijaRepository.findOneBy({ id: prueba.asignaturaFijaId });
      if (!asignaturaFija) {
        throw new Error('Asignatura fija no encontrada');
      }
      const nivel = asignaturaFija.nivel;
      return nivel;
    } else {
      throw new Error('Prueba debe tener asignatura creada o fija');
    }
  }

  private async contarErroresGraves(pruebas: PruebaDto[]) {
  let errores = 0;

  for (let i = 0; i < pruebas.length; i++) {
    for (let j = i + 1; j < pruebas.length; j++) {
      const a = pruebas[i];
      const b = pruebas[j];

      const mismaHora = a.horario === b.horario;
      const mismoDia = a.Dia === b.Dia;

      if (mismaHora && mismoDia) {
        if (a.salaId === b.salaId) errores++;
        if (a.idprofesor === b.idprofesor) errores++;
        const nivelA = await this.nivel(a);
        const nivelB = await this.nivel(b);

        if (nivelA === nivelB) errores++;
      }
    }
  }

  return errores;
}

private async  contarErroresModerados(pruebas: PruebaDto[]) {
  let errores = 0;

  for (let i = 0; i < pruebas.length; i++) {
    for (let j = i + 1; j < pruebas.length; j++) {
      const a = pruebas[i];
      const b = pruebas[j];

      const mismaHora = a.horario === b.horario;
      const mismoDia = a.Dia === b.Dia;

      if (mismaHora && mismoDia) {
        const nivelA = await this.nivel(a);
        const nivelB = await this.nivel(b);
        const distancia = Math.abs(nivelA - nivelB);
        if (distancia === 1) errores++;
      }
    }
  }

  return errores;
}
private contarErroresLeves(pruebas: PruebaDto[]) {
  return pruebas.filter(p => p.profesorError).length;
}

async analizarErrores({ caledarioId, pruebas }:  CheckErroresDto) {
  const errores_graves = await this.contarErroresGraves(pruebas);
  const errores_moderados = await this.contarErroresModerados(pruebas);
  const errores_leves = this.contarErroresLeves(pruebas);

  const calidad = Math.max(0, 100 - errores_graves * 10 - errores_moderados * 5 - errores_leves);

  const calendario = await this.calendarioRepository.findOneBy({ id: caledarioId });
  if (calendario) {
    calendario.errores_graves = errores_graves;
    calendario.errores_moderados = errores_moderados;
    calendario.errores_leves = errores_leves;
    calendario.calidad = calidad;

    await this.calendarioRepository.save(calendario);
  }

  return {
    errores_graves,
    errores_moderados,
    errores_leves,
    calidad,
  };
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
