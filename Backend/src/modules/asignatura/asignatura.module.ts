import { Module } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaController } from './asignatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaturaCreada } from './entities/asignatura-creada.entity';
import { AsignaturaFija } from './entities/asignatura-fija.entity';
 

@Module({
    imports: [TypeOrmModule.forFeature([AsignaturaCreada,AsignaturaFija])], // Import TypeOrmModule with your entities if needed
    controllers: [AsignaturaController],
    providers: [AsignaturaService],
    exports: [], // Export any providers or modules if needed


})
export class AsignaturaModule {


}
