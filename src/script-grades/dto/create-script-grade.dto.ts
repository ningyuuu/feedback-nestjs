import { ApiProperty } from '@nestjs/swagger';

export class CreateScriptGradeDto {
  @ApiProperty()
  script: number;

  @ApiProperty()
  grading: number;

  @ApiProperty()
  grade: number;

  @ApiProperty()
  comments: string;
}
