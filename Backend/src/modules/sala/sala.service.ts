import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaDeClases } from './entities/sala.entity';
import { Repository } from 'typeorm';
import { crearSalaDto } from './dto/crear-sala.dto';
@Injectable()
export class SalaService {
    constructor(
        @InjectRepository(SalaDeClases) // Assuming Sala is the entity you want to inject
        private readonly salaRepository: Repository<SalaDeClases>, // Inject your repository here
    ) {
        
    }

    async crearSala(dto: crearSalaDto) {
        const eliminada = false; // Default value for eliminada
        const nuevaSala = this.salaRepository.create({nombre:dto.nombre, eliminada: eliminada});
        const salaCreada = await this.salaRepository.save(nuevaSala);
        return salaCreada.id; // Assuming the entity has an 'id' field
    }


    async obtenerSalas() {
        const salas = await this.salaRepository.find();
        return salas.map((s) => ({
            id_sala: s.id,
            nombre: s.nombre,
    }))
}


}
