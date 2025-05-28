import { Prueba } from 'src/modules/evaluacion/entities/prueba.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class AsignaturaCreada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NRC: string;

  @Column()
  nivel: string;

  @Column()
  nombre: string;
  @Column()
  eliminada: boolean;
  @OneToMany(() => Prueba, prueba => prueba.asignaturaCreada)
  pruebas: Prueba[];
}