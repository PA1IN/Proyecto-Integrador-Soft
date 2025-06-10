import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { Repository } from 'typeorm';
import { RelacionPruebaCalendario } from './entities/relacion-prueba-calendario.entity';
import { SalaDeClases } from '../sala/entities/sala.entity';
import { Asignatura } from '../asignatura/entities/asignatura-creada.entity';

import { Profesor } from '../profesor/entities/profesor.entity';
import { PruebaDto } from './dto/crear-prueba.dto';
import e from 'express';
import { CrearManyPruebasDto } from './dto/crear-many-pruebas.dto';
import { Calendario } from '../calendario/entities/calendario.entity';
@Injectable()
export class EvaluacionService {
    constructor(
        @InjectRepository(Prueba) 
        private readonly pruebaRepository: Repository<Prueba>, // Inject your repository here
        @InjectRepository(RelacionPruebaCalendario)
        private readonly relacionPruebaCalendarioRepository: Repository<RelacionPruebaCalendario>, 
        @InjectRepository(SalaDeClases)
        private readonly salaDeClasesRepository: Repository<SalaDeClases>,
        @InjectRepository(Asignatura)
        private readonly asignaturaCreadaRepository: Repository<Asignatura>, // Inject your repository here
         // Inject your repository here
        @InjectRepository(Profesor)
        private readonly profesorRepository: Repository<Profesor>, // Inject your repository here
        @InjectRepository(Calendario)
        private readonly calendarioRepository: Repository<Calendario> // Inject your repository here
    ) {}
    
    async crearPruebas(dto: CrearManyPruebasDto) {
  const pruebasCreadas = await Promise.all(
    dto.pruebas.map(async (pruebaDto) => {
      const prueba = await this.createSinglePrueba(pruebaDto);
      await this.crearRelacionPruebaCalendario(prueba.id, dto.calendarioId);
      return prueba;
    }),
  );

  return pruebasCreadas;
}


    
    
    async createSinglePrueba(dto: PruebaDto) {
        const prueba = new Prueba();

       

        if (dto.id_asignatura) {
    const asignaturaCreada = await this.asignaturaCreadaRepository.findOneBy({ id: dto.id_asignatura });
    if (!asignaturaCreada) throw new Error('Asignatura creada no encontrada');
    prueba.asignatura = asignaturaCreada;
   
        } 
        
        const sala = await this.salaDeClasesRepository.findOneBy({ id: dto.id_sala });
        if (!sala) {
            throw new Error('Sala not found');
        }
        prueba.sala = sala;
        const profesor = await this.profesorRepository.findOneBy({ id: dto.id_profesor });
        if (!profesor) {
            throw new Error('Profesor not found');
        }
        prueba.profesor = profesor;
        prueba.horario = dto.horario;
        prueba.dia = dto.dia;
        prueba.profesorError = dto.profesor_error || false;
        prueba.eliminado = dto.eliminado || false;
        
        return await this.pruebaRepository.save(prueba);
    }


    async crearRelacionPruebaCalendario(pruebaId: number, calendarioId: number) {
        const prueba = await this.pruebaRepository.findOne({
            where: { id: pruebaId },
    });
        if (!prueba) {
            throw new Error('Prueba not found');
        }
        const calendario = await this.calendarioRepository.findOne({
            where: { id: calendarioId },})

        if (!calendario) {
            throw new Error('Calendario not found');
        }
        const relacion = new RelacionPruebaCalendario();
        relacion.prueba = prueba;
        relacion.calendario = calendario;
        relacion.eliminada = false; // Assuming you want to set this to false by default
        return await this.relacionPruebaCalendarioRepository.save(relacion);
    }
    async obtenerPruebasPorCalendario(calendarioId: number): Promise<Prueba[]> {
    const relaciones = await this.relacionPruebaCalendarioRepository.find({
    where: { calendario: { id: calendarioId }, eliminada: false },
    relations: ['prueba'], // Carga la entidad Prueba
    });

    return relaciones.map(rel => rel.prueba);
}

    
        
}
