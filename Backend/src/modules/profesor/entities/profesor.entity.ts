import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  @Column()
  Eliminado: boolean;
  @Column({ default: false })
  creado: boolean;
}