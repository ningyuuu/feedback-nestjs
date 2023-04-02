import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Assignment } from './entities/assignment.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [MikroOrmModule.forFeature([Assignment]), ProjectsModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
