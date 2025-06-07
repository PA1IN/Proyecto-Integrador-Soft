import { Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { Repository } from 'typeorm';
import { CarreraAsignatura } from './entities/Carrera-Asignatura.entity';
import { CarreraAsignaturaRelacionDto } from './dto/carrera-asignatura-relacion.dto';
@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>, // Inject your repository here
    @InjectRepository(CarreraAsignatura)
    private readonly carreraAsignaturaRepository: Repository<CarreraAsignatura>, // Inject Carrera-Asignatura repository if needed
  ) {}

  async create(createCarreraDto: CreateCarreraDto) {
    return await this.carreraRepository.save(createCarreraDto);
  }

  findAll() {
    return this.carreraRepository.find(); // Fetch all carreras from the database
  }

  async findOne(nombre: string) {
    return this.carreraRepository.findBy({ nombre }); // Fetch a carrera by its name
   
  }

  update(id: number, updateCarreraDto: UpdateCarreraDto) {
    return `This action updates a #${id} carrera`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrera`;
  }
  async relacionarAsignatura( dto: CarreraAsignaturaRelacionDto){
    const carrera = await this.carreraRepository.findOneBy({ nombre: dto.nombre });
    if (!carrera) {
      throw new Error('Carrera not found');
    }

    const asignatura = await this.carreraAsignaturaRepository.findOneBy({ id: dto.asignaturaId });
    if (!asignatura) {
      throw new Error('Asignatura not found');
    }

    const carreraAsignatura = this.carreraAsignaturaRepository.create({
      carrera,
      asignatura,
    });

    return this.carreraAsignaturaRepository.save(carreraAsignatura);

  }
}
