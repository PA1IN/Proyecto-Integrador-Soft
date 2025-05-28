import { Module } from '@nestjs/common';
import { ColumnasService } from './columnas.service';
import { ColumnasController } from './columnas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columna } from './entities/columna.entity';
import { CalendarioService } from '../calendario/calendario.service';
import { CalendarioModule } from '../calendario/calendario.module';
import { Calendario } from '../calendario/entities/calendario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Columna,Calendario])], // Import any other modules if needed
  controllers: [ColumnasController],
  providers: [ColumnasService],
  exports: [ColumnasService, TypeOrmModule], // Export the service if needed in other modules
})
export class ColumnasModule {}
