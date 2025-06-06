import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { RelacionPruebaCalendario } from 'src/modules/evaluacion/entities/relacion-prueba-calendario.entity';
import { Columna } from 'src/modules/columnas/entities/columna.entity';
import { IsBoolean } from 'class-validator';

@Entity()
export class Calendario {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.calendarios)
    usuario: User;
    @Column({default: 0})
    errores_leves: number;
    @Column({default: 0})
    errores_graves: number;
    @Column({default: 0})
    errores_moderados: number;
    @Column({default: 100})
    calidad: number;
    @Column()
    fecha: Date;
    @Column()
    nombre: string;
     @OneToMany(() => RelacionPruebaCalendario, rpc => rpc.calendario)
    relaciones: RelacionPruebaCalendario[];
    @OneToMany(() => Columna, columna => columna.calendario, { cascade: true })
    columnas: Columna[];
    @Column({ default: false })
    eliminado: boolean;
    @Column({ default: true })
    temporal: boolean;
    

}
