import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Snippet } from './entities/snippet.entity';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [MikroOrmModule.forFeature([Snippet]), AssignmentsModule, ProjectsModule],
  controllers: [SnippetsController],
  providers: [SnippetsService],
  exports: [SnippetsService],
})
export class SnippetsModule {}
