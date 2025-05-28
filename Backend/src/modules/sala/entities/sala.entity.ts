import { Prueba } from 'src/modules/evaluacion/entities/prueba.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class SalaDeClases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  @Column( )
  eliminada: boolean; 

  @OneToOne(() => Prueba)
  @JoinColumn()
  prueba: Prueba;
}