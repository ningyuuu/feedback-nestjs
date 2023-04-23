import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Student } from './entities/student.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [MikroOrmModule.forFeature([Student]), ProjectsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
