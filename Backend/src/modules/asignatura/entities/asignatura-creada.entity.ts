
import { CarreraAsignatura } from 'src/modules/carrera/entities/Carrera-Asignatura.entity';
import { Prueba } from 'src/modules/evaluacion/entities/prueba.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nrc: string;

  @Column()
  nivel: number;

  @Column()
  nombre: string;
  @Column()
  eliminada: boolean;
  @Column({ default: false })
  creada: boolean; 
  @OneToMany(() => Prueba, prueba => prueba.asignatura)
  pruebas: Prueba[];
  @OneToMany(() => CarreraAsignatura, (ca) => ca.asignatura)
  carreraAsignaturas: CarreraAsignatura[];
}