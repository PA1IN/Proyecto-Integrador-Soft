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
        return await  this.asignaturaCrepository.find(); // Fetch all asignaturas from the database
    }
    async getAsignaturasf(){
        return await this.asignaturaFrepository.find(); // Fetch all asignaturas from the database
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
