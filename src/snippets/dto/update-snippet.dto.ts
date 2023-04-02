import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSnippetDto {
  @ApiPropertyOptional()
  assignment?: number;

  @ApiPropertyOptional()
  text: string;
}
