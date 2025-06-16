import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { RelacionPruebaCalendario } from './relacion-prueba-calendario.entity';
import { Asignatura } from 'src/modules/asignatura/entities/asignatura-creada.entity';

import { Profesor } from 'src/modules/profesor/entities/profesor.entity';
import { SalaDeClases } from 'src/modules/sala/entities/sala.entity';



@Entity()
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

 @ManyToMany(() => Profesor)
  @JoinTable({
    name: 'prueba_profesores', // nombre de la tabla intermedia
    joinColumn: { name: 'prueba_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profesor_id', referencedColumnName: 'id' },
  })
  profesores: Profesor[];

  @Column()
  horario: string;

 @ManyToMany(() => SalaDeClases)
  @JoinTable({
    name: 'prueba_salas', // nombre de la tabla intermedia
    joinColumn: { name: 'prueba_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sala_id', referencedColumnName: 'id' },
  })
  salas: SalaDeClases[];


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
