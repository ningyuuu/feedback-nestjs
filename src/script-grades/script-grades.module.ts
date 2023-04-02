import { Module } from '@nestjs/common';
import { ScriptGradesService } from './script-grades.service';
import { ScriptGradesController } from './script-grades.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScriptGrade } from './entities/script.grade.entity';
import { ScriptsModule } from 'src/scripts/scripts.module';
import { GradingsModule } from 'src/gradings/gradings.module';

@Module({
  imports: [MikroOrmModule.forFeature([ScriptGrade]), ScriptsModule, GradingsModule],
  controllers: [ScriptGradesController],
  providers: [ScriptGradesService],
})
export class ScriptGradesModule {}
