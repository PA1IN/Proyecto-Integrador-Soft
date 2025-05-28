import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { RelacionPruebaCalendario } from 'src/modules/evaluacion/entities/relacion-prueba-calendario.entity';
import { Columna } from 'src/modules/columnas/entities/columna.entity';

@Entity()
export class Calendario {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.calendarios)
    usuario: User;
    @Column()
    errores_leves: number;
    @Column()
    errores_graves: number;
    @Column()
    errores_moderados: number;
    @Column()
    calidad: number;
    @Column()
    fecha: Date;
    @Column()
    nombre: string;
     @OneToMany(() => RelacionPruebaCalendario, rpc => rpc.calendario)
    relaciones: RelacionPruebaCalendario[];
    @OneToMany(() => Columna, columna => columna.calendario, { cascade: true })
    columnas: Columna[];

}
