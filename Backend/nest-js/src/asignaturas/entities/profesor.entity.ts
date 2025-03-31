import { Column, Entity, PrimaryColumn } from "typeorm";
import { Asignatura } from "./asignatura.entity";

@Entity()
export class Profesor {
    @PrimaryColumn("uuid")
    nombre: string;
    @Column()
    asignaturas: Asignatura[];
    @Column()
    Disponibilidad: String;
}