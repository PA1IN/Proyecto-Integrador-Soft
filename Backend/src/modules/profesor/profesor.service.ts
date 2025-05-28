import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';
import { ProfesorDto } from './dto/profesor.entity';
@Injectable()
export class ProfesorService {
constructor(
    @InjectRepository(Profesor) // Assuming Profesor is the entity you want to inject
    private readonly profesorRepository: Repository<Profesor>, // Inject your repository here
) {}
async crearProfesor(dto: ProfesorDto): Promise<Profesor> {
    const eliminado = false; // Default value for eliminada
    const nuevoProfesor = this.profesorRepository.create({
        nombre: dto.nombre,Eliminado: eliminado,});
    return await this.profesorRepository.save(nuevoProfesor);
}   

async obtenerProfesores(): Promise<Profesor[]> {
    return await this.profesorRepository.find();
}
}
