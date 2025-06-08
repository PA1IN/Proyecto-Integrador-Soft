import { Module } from '@nestjs/common';
import { CalendarioService } from './calendario.service';
import { CalendarioController } from './calendario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendario } from './entities/calendario.entity';
import { User } from '../user/entities/user.entity';
import { Asignatura } from '../asignatura/entities/asignatura-creada.entity';
import { EvaluacionModule } from '../evaluacion/evaluacion.module';


@Module({
  imports: [TypeOrmModule.forFeature([Calendario,User,Asignatura]),EvaluacionModule], // Import any other modules if needed
  controllers: [CalendarioController],
  providers: [CalendarioService],
  exports: [CalendarioService, TypeOrmModule], // Export the service if needed in other modules
})
export class CalendarioModule {}
