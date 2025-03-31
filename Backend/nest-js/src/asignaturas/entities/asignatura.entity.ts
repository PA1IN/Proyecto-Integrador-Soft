import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Profesor } from "./profesor.entity";

@Entity()
export class Asignatura {
    @PrimaryColumn("uuid")
    NRC: String;

    @Column()
    nombre: String;
    @Column({nullable: false})
    Horario: String;
    @Column({nullable: false})
    Alumnos: Number;
    @Column({nullable: true})
    AlumnosTeam: Number;
    @Column()
    nivel: String;
    @ManyToMany(() => "profesor", (profesor) => profesor.asignaturas)
    @JoinTable()
    Profesores: Profesor[];

    


}
