import { Calendario } from "src/modules/calendario/entities/calendario.entity";
import {Column,PrimaryGeneratedColumn,Entity, OneToMany}  from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({length:35})
    name: string;
    @Column({ unique: true, nullable: false })
    rut: string;
    @Column({nullable: false})
    password: string;
    @Column({nullable: false})
    correo: string;
    @OneToMany(() => Calendario, calendario => calendario.usuario)
    calendarios: Calendario[];

}
