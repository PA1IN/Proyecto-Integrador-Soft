import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { RelacionPruebaCalendario } from './entities/relacion-prueba-calendario.entity';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';
import { SalaDeClases } from '../sala/entities/sala.entity';
import { Calendario } from '../calendario/entities/calendario.entity';
import { Asignatura } from '../asignatura/entities/asignatura-creada.entity';

import { Profesor } from '../profesor/entities/profesor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Prueba,RelacionPruebaCalendario,SalaDeClases,Calendario,Asignatura,Profesor
    ])], // Import TypeOrmModule with your entities
    controllers: [EvaluacionController],
    providers: [EvaluacionService],
    exports: [EvaluacionService, TypeOrmModule], // Export the service and TypeOrmModule if needed in other modules
})
export class EvaluacionModule {

    
    
    
}
