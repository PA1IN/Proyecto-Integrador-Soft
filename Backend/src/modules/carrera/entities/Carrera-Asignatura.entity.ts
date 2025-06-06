import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Carrera } from './carrera.entity';
import { Asignatura } from 'src/modules/asignatura/entities/asignatura-creada.entity';
@Entity()
export class CarreraAsignatura {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Carrera, (carrera) => carrera.carreraAsignaturas, { eager: true })
    @JoinColumn({ name: 'id_carrera' })
    carrera: Carrera;

    @ManyToOne(() => Asignatura, (asignatura) => asignatura.carreraAsignaturas, { eager: true })
    @JoinColumn({ name: 'id_asignatura' })
    asignatura: Asignatura;

    
    
   
}