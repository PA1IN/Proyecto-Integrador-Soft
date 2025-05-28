import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RelacionPruebaCalendario } from './relacion-prueba-calendario.entity';
import { AsignaturaCreada } from 'src/modules/asignatura/entities/asignatura-creada.entity';
import { AsignaturaFija } from 'src/modules/asignatura/entities/asignatura-fija.entity';
import { Profesor } from 'src/modules/profesor/entities/profesor.entity';
import { SalaDeClases } from 'src/modules/sala/entities/sala.entity';



@Entity()
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NRC: string;

  @Column()
  nivelAsignatura: number;

  @Column()
  nombreAsignatura: string;

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

  @OneToMany(() => RelacionPruebaCalendario, rpc => rpc.prueba)
  relacionesCalendario: RelacionPruebaCalendario[];
  @ManyToOne(() => AsignaturaCreada, { nullable: true })
  asignaturaCreada: AsignaturaCreada;

  @ManyToOne(() => AsignaturaFija, { nullable: true })
  asignaturaFija: AsignaturaFija;
  @Column({ default: false })
  eliminada: boolean;
}
