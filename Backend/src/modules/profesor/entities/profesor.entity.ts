import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RelacionPruebaProfesor } from '../../evaluacion/entities/relacion-prueba-profesor.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => RelacionPruebaProfesor, rpp => rpp.profesor)
  relaciones: RelacionPruebaProfesor[];
}