import { Module } from '@nestjs/common';
import { getEnvValue } from './config/config.service';
import { TypeOrmModule
} from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AsignaturaModule } from './modules/asignatura/asignatura.module';
import { AuthModule } from './modules/auth/auth.module';
import { Asignatura } from './modules/asignatura/entities/asignatura-creada.entity';

import { Calendario } from './modules/calendario/entities/calendario.entity';
import { Prueba } from './modules/evaluacion/entities/prueba.entity';
import { Columna } from './modules/columnas/entities/columna.entity';
import { RelacionPruebaCalendario } from './modules/evaluacion/entities/relacion-prueba-calendario.entity';
import { Profesor } from './modules/profesor/entities/profesor.entity';
import { SalaDeClases } from './modules/sala/entities/sala.entity';
import { SalaModule } from './modules/sala/sala.module';
import { ColumnasModule } from './modules/columnas/columnas.module';
import { CalendarioModule } from './modules/calendario/calendario.module';
import { EvaluacionModule } from './modules/evaluacion/evaluacion.module';
import { ProfesorModule } from './modules/profesor/profesor.module';
import { CarreraModule } from './modules/carrera/carrera.module';
import { Carrera } from './modules/carrera/entities/carrera.entity';
import { CarreraAsignatura } from './modules/carrera/entities/Carrera-Asignatura.entity';
import { MailModule } from './modules/mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnvValue('DATABASE_HOST'),
      port: +getEnvValue('DATABASE_PORT'),
      username: getEnvValue('DATABASE_USERNAME'),
      password: getEnvValue('DATABASE_PASSWORD'),
      database: getEnvValue('DATABASE_NAME'),
      synchronize: true,
      entities: [User,Asignatura,Calendario,Prueba,Columna,RelacionPruebaCalendario,Profesor,SalaDeClases,Carrera,CarreraAsignatura], 
    }),
    UserModule, 
    AsignaturaModule,
    AuthModule,
    SalaModule,
    ColumnasModule,
    CalendarioModule,
    EvaluacionModule,
    ProfesorModule,
    CarreraModule,
    MailModule,
    
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
