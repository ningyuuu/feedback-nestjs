import { ApiProperty } from '@nestjs/swagger';

export class SubmitScriptGradesDto {
  @ApiProperty()
  scriptId: number;

  @ApiProperty()
  gradings: ScriptGradeSubmission[];
}

export class ScriptGradeSubmission {
  @ApiProperty()
  gradingId: number;

  @ApiProperty()
  grade: number;

  @ApiProperty()
  comments: string;
}
