import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';

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
        const asignaturas = await this.asignaturaCrepository.find({where : {creada: true  }}); // Fetch all asignaturas from the database
        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        
        nivel: a.nivel,
        nombre: a.nombre,
        creada: a.creada,
        eliminado: a.eliminada,
    })); // Fetch all asignaturas from the database
    }
    
    

    async createAsignatura(createAsignaturaDto: CreateAsignaturaDto) {
        
        const asignatura = this.asignaturaCrepository.create({
            nrc: createAsignaturaDto.nrc,
            nivel: createAsignaturaDto.nivel,
            nombre: createAsignaturaDto.nombre,
            eliminada: false

        });
        if(createAsignaturaDto.creada){
            asignatura.creada = createAsignaturaDto.creada; 
        }
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
            eliminada: asignaturaguardada.eliminada
        } ; // Save the new asignatura to the database
    }

    async crearasignaturaprod(dto: CreateAsignaturaDto){
        const asignatura = this.asignaturaCrepository.create({
            nrc: dto.nrc,
            nivel: dto.nivel,
            nombre: dto.nombre,
            creada: true,
            eliminada: false

        });
        const asignaturaguardada = await this.asignaturaCrepository.save(asignatura)


        const carrera = await this.carreraRepository.findOne({
        where: { id: dto.id_carrera },
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
            eliminada: asignaturaguardada.eliminada
        } ;

    }
    async getcreadasnt(){
        const asignaturas = await this.asignaturaCrepository.find({where : {creada: false  }}); // Fetch all asignaturas from the database
        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        
        nivel: a.nivel,
        nombre: a.nombre,
        creada: a.creada,
        eliminado: a.eliminada,})); // Fetch all asignaturas from the database
    }
 
    
    async getbynivel(nivel:Number){
        return this.asignaturaCrepository.findOneBy({});
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
      

}
