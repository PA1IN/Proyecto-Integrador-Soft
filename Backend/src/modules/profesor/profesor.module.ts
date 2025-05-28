import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';

@Module({
imports: [TypeOrmModule.forFeature([Profesor])], // Import any other modules if needed
controllers: [ProfesorController], // Add your controllers here if needed
providers: [ProfesorService], // Add your providers here if needed
exports: [ProfesorService, TypeOrmModule], // Export the service if needed in other modules


})
export class ProfesorModule {}
