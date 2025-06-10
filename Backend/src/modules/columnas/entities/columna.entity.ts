
import { Calendario } from 'src/modules/calendario/entities/calendario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
@Entity()
export class Columna {
@PrimaryGeneratedColumn()
id: number;
@Column()
dia:number;
@Column()
fecha: string;
@ManyToOne(() => Calendario, calendario => calendario.columnas, { onDelete: 'CASCADE' })
calendario: Calendario;



}
