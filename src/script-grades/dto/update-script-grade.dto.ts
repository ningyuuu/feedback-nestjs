import { PartialType } from '@nestjs/swagger';
import { CreateScriptGradeDto } from './create-script-grade.dto';

export class UpdateScriptGradeDto extends PartialType(CreateScriptGradeDto) {}
