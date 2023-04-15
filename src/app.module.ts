import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { GradingsModule } from './gradings/gradings.module';
import { StudentsModule } from './students/students.module';
import { ScriptsModule } from './scripts/scripts.module';
import { ScriptGradesModule } from './script-grades/script-grades.module';
import { SnippetsModule } from './snippets/snippets.module';
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgresql',
      dbName: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      debug: process.env.NODE_ENV === 'development',
      cache: { enabled: process.env.NODE_ENV === 'development' },
      metadataProvider: TsMorphMetadataProvider,
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    AssignmentsModule,
    GradingsModule,
    StudentsModule,
    ScriptsModule,
    ScriptGradesModule,
    SnippetsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
