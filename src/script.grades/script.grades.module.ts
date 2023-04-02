import { Module } from '@nestjs/common';
import { ScriptGradesService } from './script.grades.service';
import { ScriptGradesController } from './script.grades.controller';

@Module({
  controllers: [ScriptGradesController],
  providers: [ScriptGradesService]
})
export class ScriptGradesModule {}
