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
        nombre: dto.nombre,Eliminado: eliminado, creado: true,});
    return await this.profesorRepository.save(nuevoProfesor);
}   

async crearProfesorProd(dto: ProfesorDto) {
    const eliminado = false; // Default value for eliminada
    const nuevoProfesor = this.profesorRepository.create({
        nombre: dto.nombre, Eliminado: eliminado, creado: false,
    });
    return await this.profesorRepository.save(nuevoProfesor);
}


async obtenerProfesores() {
    const profesores = await this.profesorRepository.find({where: { Eliminado: false, creado: false }});


    return profesores.map((p) => ({
        id_profesor: p.id,
        nombre: p.nombre,
    }))
}
async obtenerProfesoresCreado() {
    const profesores = await this.profesorRepository.find({ where: { Eliminado: false, creado: true }, order: { creado: 'DESC' } });
    return profesores.map((p) => ({
        id_profesor: p.id,
        nombre: p.nombre,
        creado: p.creado,
    }));
}
async todosProfesores() {
    const profesores = await this.profesorRepository.find({ where: { Eliminado: false } });
    return profesores.map((p) => ({
        id_profesor: p.id,
        nombre: p.nombre,
        creado: p.creado,
    }));
}
async eliminarProfesor(id: number) {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    profesor.Eliminado = true; // Set Eliminado to true
    return this.profesorRepository.save(profesor); // Save the updated profesor
}

}

