import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaDeClases } from './entities/sala.entity';
import { SalaController } from './sala.controller';
import { SalaService } from './sala.service';

@Module({

    imports: [TypeOrmModule.forFeature([SalaDeClases])], // Import any other modules if needed
    controllers: [SalaController], // Add your controllers here if needed
    providers: [SalaService], // Add your providers here if needed
    exports: [SalaService, TypeOrmModule], // Export any services or modules if needed

})
export class SalaModule {}
