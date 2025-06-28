import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository} from 'typeorm';

import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { HorarioAsignaturaDto } from './dto/horario-asignatura.dto';
import { Asignatura } from './entities/asignatura-creada.entity';
import { Carrera } from '../carrera/entities/carrera.entity';
import { CarreraAsignatura } from '../carrera/entities/Carrera-Asignatura.entity';
import { create } from 'domain';
import { asignaturaprodDto } from './dto/asignaturaprod.dto';

@Injectable()
export class AsignaturaService {
    constructor(
        @InjectRepository(Asignatura)
        private readonly asignaturaCrepository: Repository<Asignatura>, // Inject your repository here
        @InjectRepository(Carrera)
        private readonly carreraRepository: Repository<Carrera>, // Inject Carrera repository if needed
        @InjectRepository(CarreraAsignatura)
        private readonly carreraAsignaturaRepository: Repository<CarreraAsignatura>, // Inject Carrera-Asignatura repository if needed
    ) {}
    

    async getAsignaturasc(){
        const asignaturas = await this.asignaturaCrepository.find({where : {creada: true, eliminada: false  },
            relations: ['carreraAsignaturas'],
        order: { creada: 'ASC' } },
            
        ); 

        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        
        nivel: a.nivel,
        nombre: a.nombre,
        creada: a.creada,
        eliminado: a.eliminada,
        nrc: a.nrc,
        id_carrera: a.carreraAsignaturas[0]?.carrera.id 
    })); 
    }
    
    

    async createAsignatura(createAsignaturaDto: CreateAsignaturaDto) {
        
        const asignatura = this.asignaturaCrepository.create({
            nrc: createAsignaturaDto.nrc,
            nivel: createAsignaturaDto.nivel,
            nombre: createAsignaturaDto.nombre,
            creada: createAsignaturaDto.creada || true, // Default to false if not provided
            eliminada: false

        });
        
         const asignaturaguardada = await this.asignaturaCrepository.save(asignatura)
        
        const carrera = await this.carreraRepository.findOne({
        where: { id: createAsignaturaDto.id_carrera },
        });
        if (!carrera) {
        throw new Error('Carrera no encontrada');
             }
        

         const carreraAsignatura = this.carreraAsignaturaRepository.create({
            carrera,
            asignatura: asignaturaguardada,
            });

        await this.carreraAsignaturaRepository.save(carreraAsignatura);

        return{
            id_asignatura: asignaturaguardada.id, 
            nrc: asignaturaguardada.nrc,
            nivel: asignaturaguardada.nivel,
            nombre: asignaturaguardada.nombre,
            eliminada: asignaturaguardada.eliminada,
            carreras: carrera
        } ; // Save the new asignatura to the database
    }

async crearasignaturaprod(dto: asignaturaprodDto) {
    console.log('Creando asignatura con los siguientes datos:', dto);
    const datos = mapRawAsignatura(dto);
    console.log('Datos mapeados:', datos);
    const asignaturasGuardadas: {
    id_asignatura: number;
    nrc: string;
    nivel: number;
    nombre: string;
    eliminada: boolean;
    carrera: string;
    }[] = [];
    const nombreLimpio = limpiarNombre(datos.nombre);
     // Verificar si ya existe una asignatura con ese nombre base
    const existe = await this.asignaturaCrepository
      .createQueryBuilder('asignatura')
      .where('LOWER(asignatura.nombre) LIKE :nombre', {
        nombre: `${nombreLimpio.toLowerCase()}%`,
      })
      .getOne();

    if (existe) {
      console.log(`Asignatura con nombre base "${nombreLimpio}" ya existe, omitiendo creación.`);
        
    }

    for (let i = 0; i < datos.id_carreras.length; i++) {
        const idCarrera = datos.id_carreras[i];
        const nivel = datos.niveles[i];
        

        const carrera = await this.carreraRepository.findOne({
        where: { id: idCarrera },
        });

        if (!carrera) {
        throw new Error(`Carrera con ID ${idCarrera} no encontrada`);
        }

   

    // Crear asignatura
    const nuevaAsignatura = this.asignaturaCrepository.create({
      nrc: datos.nrc,
      nombre: nombreLimpio, // se guarda con el nombre completo
      nivel,
      creada: datos.creada ?? false,
      eliminada: false,
    });

    const asignaturaGuardada = await this.asignaturaCrepository.save(nuevaAsignatura);

    const carreraAsignatura = this.carreraAsignaturaRepository.create({
      carrera,
      asignatura: asignaturaGuardada,
    });

    await this.carreraAsignaturaRepository.save(carreraAsignatura);

    asignaturasGuardadas.push({
      id_asignatura: asignaturaGuardada.id,
      nrc: asignaturaGuardada.nrc,
      nivel: asignaturaGuardada.nivel,
      nombre: asignaturaGuardada.nombre,
      eliminada: asignaturaGuardada.eliminada,
      carrera: carrera.nombre,
    });
  }

  return asignaturasGuardadas;
}



    async getcreadasnt(){
        const asignaturas = await this.asignaturaCrepository.find({where : {creada: false, eliminada: false  },
            relations: ['carreraAsignaturas']},
            
        ); // Fetch all asignaturas from the database
        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        
        nivel: a.nivel,
        nombre: a.nombre,
        creada: a.creada,
        eliminado: a.eliminada,
        nrc: a.nrc,
        id_carrera: a.carreraAsignaturas[0]?.carrera.id 
    })); // Fetch all asignaturas from the database
        
    }
 
    
    async getbynivel(nivel:number){
        return this.asignaturaCrepository.find({
            where: { nivel: nivel },
        });
    }
    
    async getbyNRC(NRC:string){
        return this.asignaturaCrepository.findOneBy({nrc: NRC}); // Fetch asignatura by NRC
    }
    async getbyNombre(nombre:string){
        return this.asignaturaCrepository.findOneBy({nombre: nombre}); // Fetch asignatura by name
    }
    

    async eliminarAsignatura(id: number) {
        const asignatura = await this.asignaturaCrepository.findOneBy({ id });
        if (!asignatura) {
            throw new NotFoundException(`Asignatura  ${id} no encontrada`);
        }
        asignatura.eliminada = true; // Mark the asignatura as deleted
        await this.asignaturaCrepository.save(asignatura); // Save the updated asignatura
        return {
            message: `Asignatura con ${id} a sido eliminada`,
            id_asignatura: asignatura.id,
            nrc: asignatura.nrc,
            nivel: asignatura.nivel,
            nombre: asignatura.nombre,
            eliminada: asignatura.eliminada
        };
    
    }
    async getAsignaturaBycarrera(id_carrera: number) {
        const carreraAsignatura = await this.carreraAsignaturaRepository.find({
            where: { carrera: { id: id_carrera } },
            relations: ['asignatura'],
        });

        if (!carreraAsignatura || carreraAsignatura.length === 0) {
            throw new NotFoundException(`No se encontraron asignaturas para la carrera con ID ${id_carrera}`);
        }

        return carreraAsignatura
            .filter((ca) => ca.asignatura && ca.asignatura.eliminada === false)
            .map((ca) => ({
                id_asignatura: ca.asignatura.id,
                nrc: ca.asignatura.nrc,
                nivel: ca.asignatura.nivel,
                nombre: ca.asignatura.nombre,
                creada: ca.asignatura.creada,
                eliminada: ca.asignatura.eliminada,
            }));
    }
      
    

}
function limpiarNombre(nombre: string): string {
  const idx = nombre.indexOf('(');
  return idx !== -1 ? nombre.substring(0, idx).trim() : nombre.trim();
}

function mapRawAsignatura(data: any): asignaturaprodDto {
  return {
    nrc: data.nrc,
    nombre: data.curso,
    niveles: data.carreras.map((c: any) => c.semestre),
    id_carreras: data.carreras.map((c: any) => c.id),
    creada: true, // o false según tu lógica
  };
}