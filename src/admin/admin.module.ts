import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { GradingsModule } from 'src/gradings/gradings.module';
import { StudentsModule } from 'src/students/students.module';
import { ScriptsModule } from 'src/scripts/scripts.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [ProjectsModule, AssignmentsModule, GradingsModule, StudentsModule, ScriptsModule],
})
export class AdminModule {}
