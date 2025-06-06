import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarreraAsignatura } from './Carrera-Asignatura.entity';

@Entity()
export class Carrera {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    nombre: string;
    @OneToMany(() => CarreraAsignatura, (ca) => ca.carrera)
    carreraAsignaturas: CarreraAsignatura[];
}
