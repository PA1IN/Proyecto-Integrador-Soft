import { Module } from '@nestjs/common';
import { ColumnasService } from './columnas.service';
import { ColumnasController } from './columnas.controller';

@Module({
  controllers: [ColumnasController],
  providers: [ColumnasService],
})
export class ColumnasModule {}
