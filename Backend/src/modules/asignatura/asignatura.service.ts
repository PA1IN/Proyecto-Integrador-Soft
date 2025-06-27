import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository} from 'typeorm';

import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { HorarioAsignaturaDto } from './dto/horario-asignatura.dto';
import { Asignatura } from './entities/asignatura-creada.entity';
import { Carrera } from '../carrera/entities/carrera.entity';
import { CarreraAsignatura } from '../carrera/entities/Carrera-Asignatura.entity';
import { create } from 'domain';

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
        const asignaturas = await this.asignaturaCrepository.find({where : {creada: true  },
            relations: ['carreraAsignaturas']},
            
        ); // Fetch all asignaturas from the database

        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        
        nivel: a.nivel,
        nombre: a.nombre,
        creada: a.creada,
        eliminado: a.eliminada,
        NRC: a.nrc,
        id_carreras: a.carreraAsignaturas.map(ca => ca.carrera.id)
    })); // Fetch all asignaturas from the database
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
        
        const carreras = await this.carreraRepository.findBy({
        id: In(createAsignaturaDto.id_carreras),
        });
        
        const relaciones = carreras.map((carrera) =>
        this.carreraAsignaturaRepository.create({
        carrera,
        asignatura: asignaturaguardada,
        })
        );
        await this.carreraAsignaturaRepository.save(relaciones);

        return{
            id_asignatura: asignaturaguardada.id, 
            nrc: asignaturaguardada.nrc,
            nivel: asignaturaguardada.nivel,
            nombre: asignaturaguardada.nombre,
            eliminada: asignaturaguardada.eliminada,
            carreras: relaciones.map(ca => ca.carrera.id)
        } ; // Save the new asignatura to the database
    }

    async crearasignaturaprod(dto: CreateAsignaturaDto){
        const asignatura = this.asignaturaCrepository.create({
            nrc: dto.nrc,
            nivel: dto.nivel,
            nombre: dto.nombre,
            creada: false,
            eliminada: false

        });
        const asignaturaguardada = await this.asignaturaCrepository.save(asignatura)


        const carreras = await this.carreraRepository.findBy({
        id: In(dto.id_carreras),
        });
        
        const relaciones = carreras.map((carrera) =>
        this.carreraAsignaturaRepository.create({
        carrera,
        asignatura: asignaturaguardada,
        })
        );
        await this.carreraAsignaturaRepository.save(relaciones);

        return{
            id_asignatura: asignaturaguardada.id, 
            nrc: asignaturaguardada.nrc,
            nivel: asignaturaguardada.nivel,
            nombre: asignaturaguardada.nombre,
            eliminada: asignaturaguardada.eliminada,
            carreras: relaciones.map(ca => ca.carrera.id)
        } ;

    }
    async getcreadasnt(){
        const asignaturas = await this.asignaturaCrepository.find({where : {creada: false  }}); // Fetch all asignaturas from the database
        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        
        nivel: a.nivel,
        nombre: a.nombre,
        creada: a.creada,
        eliminado: a.eliminada,
        NRC: a.nrc,
    })); // Fetch all asignaturas from the database
        
    }
 
    
    async getbynivel(nivel:Number){
        return this.asignaturaCrepository.findOneBy({}); // Fetch asignatura by nivel
    }
    async getbyNRC(NRC:String){
        return this.asignaturaCrepository.findOneBy({});
    }
    async getbyNombre(nombre:String){
        return this.asignaturaCrepository.findOneBy({});
    }
    async getbyHorario(Horario:String){
        return this.asignaturaCrepository.findOneBy({}); 
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
