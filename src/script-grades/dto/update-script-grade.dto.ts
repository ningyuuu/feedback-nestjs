import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateScriptGradeDto {
  @ApiPropertyOptional()
  grade: number;

  @ApiPropertyOptional()
  comments: string;
}
