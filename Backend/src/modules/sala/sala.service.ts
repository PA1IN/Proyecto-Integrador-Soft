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

    async crearSalaprod(dto: crearSalaDto) {
        const eliminada = false; // Default value for eliminada
        const nuevaSala = this.salaRepository.create({nombre:dto.nombre, eliminada: eliminada, creada: false});
        const salaCreada = await this.salaRepository.save(nuevaSala);
        return salaCreada.id; // Assuming the entity has an 'id' field
    }
    async crearSala(dto: crearSalaDto) {
        const eliminada = false; // Default value for eliminada
        const nuevaSala = this.salaRepository.create({nombre:dto.nombre, eliminada: eliminada, creada: true});
        const salaCreada = await this.salaRepository.save(nuevaSala);
        return salaCreada.id; // Assuming the entity has an 'id' field
    }


    async obtenerSalas() {
        const salas = await this.salaRepository.find({where: { eliminada: false, creada: false }});
        return salas.map((s) => ({
            id_sala: s.id,
            nombre: s.nombre,
    }))

    
}
async salascreadas() {
    const salas = await this.salaRepository.find({ where: {eliminada: false, creada: true } });
    return salas.map((s) => ({
        id_sala: s.id,
        nombre: s.nombre,
        creada: s.creada,
    }));
}
    async obtenerSalasTodas() {
        const salas = await this.salaRepository.find({ where: { eliminada: false } });
        return salas.map((s) => ({
            id_sala: s.id,
            nombre: s.nombre,
            creada: s.creada,
        }));
    }

async eliminarSala(id: number) {
    const sala = await this.salaRepository.findOne({ where: { id } });
    if (!sala) {
        throw new Error('Sala no encontrada');
    }
    sala.eliminada = true; // Set eliminada to true
    await this.salaRepository.save(sala);
    return { message: 'Sala eliminada correctamente' };


}
}
