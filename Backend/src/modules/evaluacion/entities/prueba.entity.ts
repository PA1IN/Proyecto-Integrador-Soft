import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RelacionPruebaCalendario } from './relacion-prueba-calendario.entity';
import { Asignatura } from 'src/modules/asignatura/entities/asignatura-creada.entity';

import { Profesor } from 'src/modules/profesor/entities/profesor.entity';
import { SalaDeClases } from 'src/modules/sala/entities/sala.entity';



@Entity()
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profesor)
  @JoinColumn({ name: 'id_profesor' })
  profesor: Profesor;

  @Column()
  horario: string;

  @ManyToOne(() => SalaDeClases)
  @JoinColumn({ name: 'id_sala' })
  sala: SalaDeClases;

  @Column()
  dia: number;
  @Column({ name: 'profesor_error' })
  profesorError: boolean;
  @Column({ default: false })
  eliminado: boolean;

  @OneToMany(() => RelacionPruebaCalendario, rpc => rpc.prueba)
  relacionesCalendario: RelacionPruebaCalendario[];
  
  @ManyToOne(() => Asignatura, { nullable: true })
  asignatura: Asignatura;
  @Column({ default: 'prodiccion ignorar esta prueba' })
  celdaid: string;
}
