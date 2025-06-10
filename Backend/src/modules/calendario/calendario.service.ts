import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendario } from './entities/calendario.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { PruebaDto } from '../evaluacion/dto/crear-prueba.dto';
import { Asignatura } from '../asignatura/entities/asignatura-creada.entity';

import { CheckErroresDto } from './dto/checkerrores.dto';
import { EvaluacionService } from '../evaluacion/evaluacion.service';
type DetalleError = {
  id_asignatura: number;
  celdaid: string;
  tipo: 'grave' | 'moderado' | 'leve';
  mensaje: string;
};

@Injectable()
export class CalendarioService {
  constructor(
    @InjectRepository(Calendario) 
    private readonly calendarioRepository: Repository<Calendario>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    @InjectRepository(Asignatura)
    private readonly asignaturaCreadaRepository: Repository<Asignatura>,
    private readonly evaluacionService: EvaluacionService,
    
    
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
   if (createCalendarioDto.pruebas?.length > 0) {
    for (const pruebaDto of createCalendarioDto.pruebas) {
      const prueba = await this.evaluacionService.createSinglePrueba(pruebaDto);
      await this.evaluacionService.crearRelacionPruebaCalendario(prueba.id, savedCalendario.id);
    }
  }
  return savedCalendario.id;
  }
  private async nivel(prueba: PruebaDto): Promise<number> {
    if (prueba.id_asignatura) {
      console.log('Prueba tiene asignatura:', prueba.id_asignatura);
      const asignaturaCreada = await this.asignaturaCreadaRepository.findOneBy({ id: prueba.id_asignatura });
      if (!asignaturaCreada) {
        throw new Error('Asignatura creada no encontrada');
      }
      const nivel = asignaturaCreada.nivel; 
      return nivel;
    } 
      throw new Error('Prueba debe tener asignatura');
    
  }

  private async contarErroresGraves(pruebas: PruebaDto[]) {
  let errores = 0;
  const detalles: DetalleError[] = [];

  for (let i = 0; i < pruebas.length; i++) {
    for (let j = i + 1; j < pruebas.length; j++) {
      const a = pruebas[i];
      const b = pruebas[j];
      

      const mismaHora = a.horario === b.horario;
      const mismoDia = a.celdaid === b.celdaid;

      if (mismaHora && mismoDia) {
        const celdaid = `${a.celdaid}-${a.horario}`;
        if (a.id_sala === b.id_sala){
          errores++;
          detalles.push({
            id_asignatura: a.id_asignatura,
            celdaid,
            tipo: 'grave',
            mensaje: 'Conflicto de sala entre asignaturas en el mismo horario.',
          });
        
        } ;




        if (a.id_profesor === b.id_profesor) {
          errores++;
          detalles.push({
            id_asignatura: a.id_asignatura,
            celdaid,
            tipo: 'grave',
            mensaje: 'Conflicto de profesor entre asignaturas en el mismo horario.',
          });


        }
        
      }
      if(mismoDia){
        const celdaid = `${a.celdaid}-${a.horario}`;
        const nivelA = await this.nivel(a);
      const nivelB = await this.nivel(b);
      if (nivelA === nivelB) {errores++;
        detalles.push({
          id_asignatura: a.id_asignatura,
          celdaid,
          tipo: 'grave',
          mensaje: 'Asignaturas del mismo nivel en el mismo dia.',
        });
      }
      }
    }
  }

  return {errores,detalles};
}

private async  contarErroresModerados(pruebas: PruebaDto[]) {
  let errores = 0;
  const detalles: DetalleError[] = [];

  for (let i = 0; i < pruebas.length; i++) {
    for (let j = i + 1; j < pruebas.length; j++) {
      const a = pruebas[i];
      const b = pruebas[j];

      
      const mismoDia = a.id_columna === b.id_columna;

      if (mismoDia) {
        const nivelA = await this.nivel(a);
        const nivelB = await this.nivel(b);
        const distancia = Math.abs(nivelA - nivelB);
        if (distancia === 1) {
          detalles.push({
            id_asignatura: a.id_asignatura,
            celdaid:`${a.celdaid}-${a.horario}`,
            tipo: 'moderado',
            mensaje: 'Asignaturas de niveles consecutivos en el mismo dia.',
          });
          
          
          
          errores++;}
      }
    }
  }

  return {errores,detalles};
}
private contarErroresLeves(pruebas: PruebaDto[]) {
  const detalles = pruebas
    .filter(p => p.profesor_error)
    .map(p => ({
      id_asignatura: p.id_asignatura,
      celdaid: `${p.celdaid}`,
      tipo: 'leve',
      mensaje: 'Profesor tiene conflicto o no fue asignado correctamente.',
    }));

  return { errores: detalles.length, detalles };
}

async analizarErrores({ caledarioId, pruebas }:  CheckErroresDto) {
  const errores_graves = await this.contarErroresGraves(pruebas);
  const errores_moderados = await this.contarErroresModerados(pruebas);
  const errores_leves = this.contarErroresLeves(pruebas);
  const detallesErrores = [errores_graves.detalles];

  const calidad = Math.max(0, 100 - errores_graves.errores * 10 - errores_moderados.errores * 5 - errores_leves.errores);

  const calendario = await this.calendarioRepository.findOneBy({ id: caledarioId });
  if (calendario) {
    calendario.errores_graves = errores_graves.errores;
    calendario.errores_moderados = errores_moderados.errores;
    calendario.errores_leves = errores_leves.errores;
    calendario.calidad = calidad;

    await this.calendarioRepository.save(calendario);
  }

  return {
    errores_graves,
    errores_moderados,
    errores_leves,
    calidad,
    detalles: detallesErrores,
  };
}





  async findAll() {
    const calendarios = await this.calendarioRepository.find({
      relations: ['usuario', 'relaciones', 'columnas'],});
    
   return calendarios.map((calendario) => {
    return {
      id: calendario.id,
      nombre: calendario.nombre,
      id_usuario: calendario.usuario.id,
      fecha_creacion: calendario.fecha,
    };
  });
  }

  async findOne(id: number) {
    const calendario = await this.calendarioRepository.findOne({
      where: { id },
      relations: [
      'usuario',
      'columnas',
     'relaciones',
      'relaciones.prueba',
      'relaciones.prueba.profesor',
      'relaciones.prueba.sala',
      'relaciones.prueba.asignatura',
    ],
    }) ;
     if (!calendario) {
    throw new NotFoundException('Calendario no encontrado');
  }

    return {
    id: calendario.id,
    nombre: calendario.nombre,
    id_usuario: calendario.usuario.rut, // Asegúrate que 'rut' exista en tu entidad User
    fecha_creacion: calendario.fecha,
    columnas: calendario.columnas.map(col => ({
      id_columna: col.id,
      dia: col.dia,
      fecha: col.fecha,
    })),
    pruebas: calendario.relaciones.map(rpc => {
      const prueba = rpc.prueba;

      return {
        id_asignatura: prueba.asignatura?.id ?? null,
        nombre_asignatura: prueba.asignatura?.nombre ?? null,
        nivel: prueba.asignatura?.nivel ?? null,
        horario: prueba.horario,
        id_profesor: prueba.profesor?.id ?? null,
        id_sala: prueba.sala?.id ?? null,
        profesor_error: prueba.profesorError,
        eliminado: prueba.eliminado,
        dia: prueba.dia
      };
    }),
  };
  }

  update(id: number, updateCalendarioDto: UpdateCalendarioDto) {
    return `This action updates a #${id} calendario`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendario`;
  }
}
