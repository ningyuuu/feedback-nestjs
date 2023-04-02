import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Assignment } from './entities/assignment.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Assignment])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
