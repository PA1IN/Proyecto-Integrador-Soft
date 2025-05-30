import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { HorarioAsignaturaDto } from './dto/horario-asignatura.dto';
import { AsignaturaCreada } from './entities/asignatura-creada.entity';
import { AsignaturaFija } from './entities/asignatura-fija.entity';
@Injectable()
export class AsignaturaService {
    constructor(
        @InjectRepository(AsignaturaCreada)
        private readonly asignaturaCrepository: Repository<AsignaturaCreada>, // Inject your repository here
        @InjectRepository(AsignaturaFija)
        private readonly asignaturaFrepository: Repository<AsignaturaFija> // Inject your repository here
    ) {}

    async getAsignaturasc(){
        const asignaturas = await this.asignaturaCrepository.find(); // Fetch all asignaturas from the database
        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        NRC: a.NRC,
        nivel: a.nivel,
        nombre: a.nombre,
        eliminada: a.eliminada,
    })); // Fetch all asignaturas from the database
    }
    async getAsignaturasf(){
        const asignaturas = await this.asignaturaFrepository.find(); // Fetch all asignaturas from the database
        return asignaturas.map((a) => ({
        id_asignatura: a.id,
        NRC: a.NRC,
        nivel: a.nivel,
        nombre: a.nombre,
        
    })); 
    }

    async createAsignatura(createAsignaturaDto: CreateAsignaturaDto) {
        
        const asignatura = this.asignaturaCrepository.create({
            NRC: createAsignaturaDto.NRC,
            nivel: createAsignaturaDto.nivel,
            nombre: createAsignaturaDto.nombre,
            eliminada: false

        });
         const asignaturaguardada = await this.asignaturaFrepository.save(asignatura)
        return{
            id_asignatura: asignaturaguardada.id, 
            NRC: asignaturaguardada.NRC,
            nivel: asignaturaguardada.nivel,
            nombre: asignaturaguardada.nombre,
            eliminada: asignaturaguardada.eliminada
        } ; // Save the new asignatura to the database
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
    

      

}
