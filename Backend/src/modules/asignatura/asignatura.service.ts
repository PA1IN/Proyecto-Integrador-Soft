import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { HorarioAsignaturaDto } from './dto/horario-asignatura.dto';
import { AsignaturaCreada } from './entities/asignatura-creada.entity';
@Injectable()
export class AsignaturaService {
    constructor(
        @InjectRepository(AsignaturaCreada)
        private readonly asignaturaCrepository: Repository<AsignaturaCreada> // Inject your repository here
    ) {}

    async getAsignaturas(){
        return await  this.asignaturaCrepository.find(); // Fetch all asignaturas from the database
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
