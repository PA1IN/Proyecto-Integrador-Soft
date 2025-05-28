import { Prueba } from 'src/modules/evaluacion/entities/prueba.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class AsignaturaFija {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NRC: string;

  @Column()
  nivel: string;

  @Column()
  nombre: string;
  @OneToMany(() => Prueba, prueba => prueba.asignaturaFija)
    pruebas: Prueba[];
}