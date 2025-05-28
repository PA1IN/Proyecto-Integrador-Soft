import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Prueba } from './prueba.entity';
import { Calendario } from '../../calendario/entities/calendario.entity';

@Entity()
export class RelacionPruebaCalendario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Calendario, calendario => calendario.relaciones)
  calendario: Calendario;

  @ManyToOne(() => Prueba, prueba => prueba.relacionesCalendario)
  prueba: Prueba;
  @Column()
  eliminada: boolean;
}