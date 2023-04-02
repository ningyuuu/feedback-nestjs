import { Module } from '@nestjs/common';
import { GradingsService } from './gradings.service';
import { GradingsController } from './gradings.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Grading } from './entities/grading.entity';
import { AssignmentsModule } from 'src/assignments/assignments.module';

@Module({
  imports: [MikroOrmModule.forFeature([Grading]), AssignmentsModule],
  controllers: [GradingsController],
  providers: [GradingsService],
})
export class GradingsModule {}
