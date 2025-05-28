import { Module } from '@nestjs/common';
import { CalendarioService } from './calendario.service';
import { CalendarioController } from './calendario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendario } from './entities/calendario.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calendario,User])], // Import any other modules if needed
  controllers: [CalendarioController],
  providers: [CalendarioService],
  exports: [CalendarioService, TypeOrmModule], // Export the service if needed in other modules
})
export class CalendarioModule {}
