import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { CarreraAsignatura } from './entities/Carrera-Asignatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera, CarreraAsignatura])], // Import TypeOrmModule with your entities if needed
  controllers: [CarreraController],
  providers: [CarreraService],
})
export class CarreraModule {}
